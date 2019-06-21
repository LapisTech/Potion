/// <reference path="./Game.ts" />

interface AppConfig
{
	board: PotionBoardElement;
	swipe: SwipeAreaElement;
}

type PotionArray = ( PotionBottleElement | null )[];

enum Key { Up, Down, Left, Right }

class App
{
	private config: AppConfig;
	private game: Game | null;
	private keys: { [ keys: number ]: Key };

	constructor( config: AppConfig )
	{
		this.config = config;

		this.game = null;

		this.initKey();

		this.initInput();
	}

	private initKey()
	{
		this.keys =
		{
			37: Key.Left,  // Left
			65: Key.Left,  // A
			38: Key.Up,    // Up
			87: Key.Up,    // W
			39: Key.Right, // Right
			68: Key.Right, // D
			40: Key.Down,  // Down
			83: Key.Down,  // S
		};
	}

	private initInput()
	{
		this.config.swipe.addEventListener( 'swipe', ( event ) =>
		{
			if ( !this.game ) { return; }
			this.swipe( this.radianToKey( event.detail.radian ) );
		} );

		document.addEventListener( 'keydown', ( event ) =>
		{
			if ( !this.game ) { return; }
			const key = this.keys[ event.keyCode ];
			if ( key === undefined ) { return; }
			this.swipe( key );
		} );
	}

	public radianToKey( radian: number )
	{
		if ( radian <= -Math.PI * 3 / 4 ) { return Key.Left; }
		if ( radian <= -Math.PI  / 4 ) { return Key.Up; }
		if ( radian <= Math.PI / 4 ) { return Key.Right; }
		if ( radian <= Math.PI * 3 / 4 ) { return Key.Down; }
		return Key.Left;
	}

	public swipe( key: Key )
	{
		if ( !this.game ) { return; }
		this.game.swipe( key ).forEach( ( remove ) =>
		{
			this.board().removeChild( remove );
		} );
	}

	public start()
	{
		if ( this.game ) { return; }
		this.clear();
		this.game = new Game( this );
	}

	public clear()
	{
		const board = this.board();
		const children = board.children;
		for ( let i = children.length - 1 ; 0 <= i ; --i ) { board.removeChild( children[ i ] ); }
	}

	public board() { return this.config.board; }

	public createPotion( x?: number, y?: number )
	{
		const potion = <PotionBottleElement>new (customElements.get( 'potion-botttle' ))();
		if ( x !== undefined && y != undefined )
		{
			potion.x = x;
			potion.y = y;
		}
		return potion;
	}

	public map()
	{
		const map: PotionArray = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ];
		this.board().querySelectorAll( 'potion-botttle' ).forEach( ( potion: PotionBottleElement ) =>
		{
			map[ 4 * potion.y + potion.x ] = potion;
		} );
		return map;
	}
}

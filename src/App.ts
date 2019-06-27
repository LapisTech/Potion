/// <reference path="./Game.ts" />
/// <reference path="./GameData.ts" />

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
	private data: GameData;
	private game: Game | null;
	private keys: { [ keys: number ]: Key };
	private nowpause: boolean;

	constructor( config: AppConfig )
	{
		this.config = config;
		this.data = new GameData();

		this.game = null;
		this.nowpause = false;

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
			if ( !this.game || this.nowpause ) { return; }
			this.swipe( this.radianToKey( event.detail.radian ) );
		} );

		document.addEventListener( 'keydown', ( event ) =>
		{
			if ( event.shiftKey && event.keyCode === 82 ) { return UnregisterSW(); }
			if ( !this.game || this.nowpause ) { return; }
			event.stopPropagation();
			const key = this.keys[ event.keyCode ];
			if ( key === undefined ) { return; }
			this.swipe( key );
		} );

		document.body.addEventListener( 'touchmove', ( event ) => { event.preventDefault(); }, { passive: false } );
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
		if ( this.game.swipe( key ) <= 0 ) { return; }
		if ( this.game.add() )
		{
			this.data.turn();
		} else
		{
			console.log( 'Gameover.' );
		}
	}

	public start()
	{
		if ( this.game ) { return; }
		this.board().clear();
		this.game = new Game( this );
	}

	public board() { return this.config.board; }

	public pause() { this.nowpause = true; }

	public resume() { this.nowpause = false; }

	public createPotion( x?: number, y?: number, color: string = '' )
	{
		const potion = <PotionBottleElement>new (customElements.get( 'potion-botttle' ))();
		if ( x !== undefined && y != undefined )
		{
			potion.x = x;
			potion.y = y;
			potion.color = color;
			potion.capacity = color.length;
			potion.create();
		}
		return potion;
	}

	public map() { return this.board().map(); }

	public gameData() { return this.data; }
}

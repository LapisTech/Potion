interface ScoreData
{
	'000': number;
	'001': number;
	'002': number;
	'111': number;
	'011': number;
	'112': number;
	'222': number;
	'022': number;
	'122': number;
	neutralizer: number;
	remove: number;
}

interface PlayData
{
	turn: number;
	max: number;
}

class GameData
{
	private data: PlayData;
	private score: ScoreData;

	constructor()
	{
		this.data = { turn: 0, max: 0 };
		this.newGame();
	}

	private positiveNumber( num: number | string | null )
	{
		if ( !num ) { return 0; }
		if ( typeof num !== 'number' ) { num = parseInt( num ); }
		if ( Number.isNaN( num ) || num < 0 ) { return 0; }
		return num;
	}

	public newGame()
	{
		this.data.turn = 1;
		this.score =
		{
			'000': 0,
			'001': 0,
			'002': 0,
			'111': 0,
			'011': 0,
			'112': 0,
			'222': 0,
			'022': 0,
			'122': 0,
			neutralizer: 0,
			remove: 0,
		};
	}

	public turn() { ++this.data.turn; }

	public calc() { return this.score[ '000' ] + this.score[ '111' ] + this.score[ '222' ]; }

	public add( potion: PotionBottleElement )
	{
		if ( potion.neutralizer )
		{
			++this.score.neutralizer;
		} else if ( potion.hasAttribute( 'disable' ) )
		{
			++this.score.remove;
		} else if( 3 <= potion.capacity )
		{
			++this.score[ <keyof ScoreData>potion.color ];
		}
	}

	public printScore() { return Object.keys( this.score ).sort().map( ( k: keyof ScoreData ) => { return k + ':' + this.score[ k ]; } ).join( ' ' ); }

	public save( board: PotionBoardElement )
	{
		Object.keys( this.data ).forEach( ( key: keyof PlayData ) =>
		{
			localStorage.setItem( key, this.data[ key ] + '' );
		} );

		Object.keys( this.score ).forEach( ( key: keyof ScoreData ) =>
		{
			localStorage.setItem( key, this.score[ key ] + '' );
		} );

		localStorage.setItem( 'board', board.toString() );
	}

	public load( board: PotionBoardElement )
	{
		this.data =
		{
			turn: this.positiveNumber( localStorage.getItem( 'turn' ) ),
			max: this.positiveNumber( localStorage.getItem( 'max' ) ),
		};

		this.score =
		{
			'000': this.positiveNumber( localStorage.getItem( '000' ) ),
			'001': this.positiveNumber( localStorage.getItem( '001' ) ),
			'002': this.positiveNumber( localStorage.getItem( '002' ) ),
			'111': this.positiveNumber( localStorage.getItem( '111' ) ),
			'011': this.positiveNumber( localStorage.getItem( '011' ) ),
			'112': this.positiveNumber( localStorage.getItem( '112' ) ),
			'222': this.positiveNumber( localStorage.getItem( '222' ) ),
			'022': this.positiveNumber( localStorage.getItem( '022' ) ),
			'122': this.positiveNumber( localStorage.getItem( '122' ) ),
			neutralizer: this.positiveNumber( localStorage.getItem( 'neutralizer' ) ),
			remove: this.positiveNumber( localStorage.getItem( 'remove' ) ),
		};

		board.fromString( localStorage.getItem( 'board' ) || '' );
	}
}

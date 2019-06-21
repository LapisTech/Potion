class Game
{
	private app: App;

	constructor( app: App )
	{
		this.app = app;
		//app.board().appendChild( app.createPotion( this.rand(), this.rand() ) );
app.board().appendChild( app.createPotion( 1, 1 ) );
app.board().appendChild( app.createPotion( 1, 2 ) );
	}

	private rand( max = 4 ) { return Math.floor( Math.random() * max ); }

	public swipe( key: Key )
	{
		console.log( key );
		const map = this.app.map();
		switch( key )
		{
			case Key.Up: return this.moveUp( map );
		}
		return [];
	}

	private moveUp( map: PotionArray )
	{
		const removes: PotionBoardElement[] = [];
		console.log(map.map((v)=>{return v?1:0}).join(''));
		for ( let x = 0 ; x < 4 ; ++x )
		{
			for ( let y = 1 ; y < 4 ; ++y )
			{
				const b = map[ y * 4 + x ];
				if ( !b ) { continue; }
				for ( let _ = y - 1 ; 0 <= _ ; --_ )
				{
					const a = map[ _ * 4 + x ];
					if ( a )
					{
						if ( this.canMerge( a, b ) )
						{
							this.merge( a, b );
							b.x = x;
							b.y = _;
							map[ y * 4 + x ] = null;
						} else { break; }
					} else
					{
						// Move;
						b.x = x;
						b.y = _;
						map[ _ * 4 + x ] = b;
						map[ ( _ + 1 ) * 4 + x ] = null;
					}
				}
			}
		}
		console.log(map.map((v)=>{return v?1:0}).join(''));
		return removes;
	}

	private canMerge( a: PotionBottleElement, b: PotionBottleElement )
	{
		return a.capacity + b.capacity <= 3;
	}

	private merge( a: PotionBottleElement, b: PotionBottleElement )
	{
		a.capacity += b.capacity;
	}
}

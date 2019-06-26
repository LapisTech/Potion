type MergedPotionArray = ( null | { potion: PotionBottleElement, merged: PotionBottleElement[] } )[];

class Game
{
	private app: App;
	private usecount: number;
	private nowmove: boolean;
	private score: ScoreData;

	constructor( app: App )
	{
		this.app = app;
		this.usecount = 0;
		this.nowmove = false;
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
		this.add();
		this.add();
	}

	public add()
	{
		const board = this.app.board();
		if ( 16 <= board.querySelectorAll( 'potion-botttle' ).length ) { return false; }
		while( true )
		{
			const x = this.rand();
			const y = this.rand();
			if ( board.querySelector( `potion-botttle[ x = "${ x }" ][ y = "${ y }" ]` ) ) { continue; }
			board.appendChild( this.app.createPotion( x, y, this.rand( 3 ) + '' ) );
			break;
		}
		return true;
	}

	private rand( max = 4 ) { return Math.floor( Math.random() * max ); }

	private canInput()
	{
		return this.usecount <= 0 && !this.nowmove;
	}

	public swipe( key: Key )
	{
		if ( !this.canInput() ) { return 0; }
		this.nowmove = true;
		const map = this.app.map().map( ( p ) => { return p ? { potion: p, merged: [] } : null; } );
		switch( key )
		{
			case Key.Up: return this.moveUp( map );
			case Key.Down: return this.moveDown( map );
			case Key.Left: return this.moveLeft( map );
			case Key.Right: return this.moveRight( map );
		}
		this.nowmove = false;
		return 0;
	}

	private moveUp( map: MergedPotionArray )
	{
		const count = this.move( map );
		this.moved( map );
		return count;
	}

	private moveDown( map: MergedPotionArray )
	{
		map = this.mapRotate( this.mapRotate( map ) );
		const count = this.move( map );
		map = this.mapRotate( this.mapRotate( map ) );
		this.moved( map );
		return count;
	}

	private moveLeft( map: MergedPotionArray )
	{
		map = this.mapRotate( map );
		const count = this.move( map );
		map = this.mapRotate( this.mapRotate( this.mapRotate( map ) ) );
		this.moved( map );
		return count;
	}

	private moveRight( map: MergedPotionArray )
	{
		map = this.mapRotate( this.mapRotate( this.mapRotate( map ) ) );
		const count = this.move( map );
		map = this.mapRotate( map );
		this.moved( map );
		return count;
	}

	private move( map: MergedPotionArray )
	{
		let count = 0;
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
						if ( a.potion.canMerge( b.potion ) )
						{
							this.merge( a.potion, b.potion );
							a.merged.push( b.potion );
							++count;
							map[ ( _ + 1 ) * 4 + x ] = null;
						}
						break;
					} else
					{
						// Move;
						++count;
						map[ _ * 4 + x ] = b;
						map[ ( _ + 1 ) * 4 + x ] = null;
					}
				}
			}
		}
		return count;
	}

	private mapRotate( map: MergedPotionArray )
	{
		[ map[ 0 ],  map[ 1 ], map[ 2 ], map[ 3 ], map[ 4 ],  map[ 5 ], map[ 6 ], map[ 7 ], map[ 8 ],  map[ 9 ], map[ 10 ], map[ 11 ], map[ 12 ], map[ 13 ], map[ 14 ], map[ 15 ] ] =
		[ map[ 12 ], map[ 8 ], map[ 4 ], map[ 0 ], map[ 13 ], map[ 9 ], map[ 5 ], map[ 1 ], map[ 14 ], map[ 10 ], map[ 6 ], map[ 2 ],  map[ 15 ], map[ 11 ], map[ 7 ],  map[ 3 ] ];
		return map;
	}

	private moved( map: MergedPotionArray )
	{
		map.forEach( ( p, i ) =>
		{
			if ( !p ) { return; }
			const x = i % 4;
			const y = Math.floor( i / 4 );
			p.potion.x = x;
			p.potion.y = y;
			p.merged.forEach( ( p ) => { p.x = x; p.y = y; } );
			if ( 3 <= p.potion.capacity && p.potion.isGood() )
			{
				++this.usecount;
				p.potion.use().then( () => { --this.usecount; } );
			}
		} );
		this.nowmove = false;
		console.log( Object.keys( this.score ).sort().map( ( k: keyof ScoreData ) => { return k + ':' + this.score[ k ]; } ).join( ' ' ) );
	}

	private merge( a: PotionBottleElement, b: PotionBottleElement )
	{
		a.merge( b );
		if ( a.neutralizer )
		{
			++this.score.neutralizer;
		} else if ( a.hasAttribute( 'disable' ) )
		{
			++this.score.remove;
		} else if( 3 <= a.capacity )
		{
			++this.score[ <keyof ScoreData>a.color ];
		}
	}
}

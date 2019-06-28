interface PotionBoardElement extends HTMLElement
{
	clear(): void;
	map(): ( PotionBottleElement | null )[];
	fromString( board: string ): boolean;
}

( ( script, init ) =>
{
	if ( document.readyState !== 'loading' ) { return init( script ); }
	document.addEventListener( 'DOMContentLoaded', () => { init( script ); } );
} )( <HTMLScriptElement>document.currentScript, ( script: HTMLScriptElement ) =>
{
	const BOTTTLE = script.dataset.bottle || 'potion-botttle';

	class PotionBoard extends HTMLElement implements PotionBoardElement
	{
		public static Init( tagname = 'potion-board' ) { if ( !customElements.get( tagname ) ) { customElements.define( tagname, this ); } }

		constructor()
		{
			super();

			const shadow = this.attachShadow( { mode: 'open' } );

			const style = document.createElement( 'style' );
			style.textContent =
			[
				':host { display: block; width: 100%; height: 100%; }',
				':host > div { position: relative; width: 100%; height: 100%; overflow: hidden; }',
				':host > div > div { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }',
				'.back { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr 1fr; }',
				'::slotted( ' + BOTTTLE + ' ) { display: block; width: 25%; height: 25%; position: absolute; transition: top 0.5s, left 0.5s; }',
				'::slotted( [ x = "0" ] ) { left: 0; }',
				'::slotted( [ x = "1" ] ) { left: 25%; }',
				'::slotted( [ x = "2" ] ) { left: 50%; }',
				'::slotted( [ x = "3" ] ) { left: 75%; }',
				'::slotted( [ y = "0" ] ) { top: 0; }',
				'::slotted( [ y = "1" ] ) { top: 25%; }',
				'::slotted( [ y = "2" ] ) { top: 50%; }',
				'::slotted( [ y = "3" ] ) { top: 75%; }',
			].join( '' );

			const back = document.createElement( 'div' );
			//animate, translate
			back.classList.add( 'back' );

			const front = document.createElement( 'div' );
			front.appendChild( document.createElement( 'slot' ) );

			const contents = document.createElement( 'div' );
			contents.appendChild( back );
			contents.appendChild( front );

			shadow.appendChild( style );
			shadow.appendChild( contents );
		}

		public clear()
		{
			const children = this.children;
			for ( let i = children.length - 1 ; 0 <= i ; --i ) { this.removeChild( children[ i ] ); }
		}

		public map()
		{
			const map: PotionArray = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ];
			this.querySelectorAll( BOTTTLE + ':not([disable])' ).forEach( ( potion: PotionBottleElement ) =>
			{
				map[ 4 * potion.y + potion.x ] = potion;
			} );
			return map;
		}

		public toString() { return this.map().map( ( p ) => { return p ? p.toString() : '_'; } ).join( '' ); }

		public fromString( board: string )
		{
			if ( typeof board !== 'string' || !board.match( /^[a-r\_\-]{16}$/ ) ) { return false; }
			const potions = Array.from( board || '' );
			potions.forEach( ( color, index ) =>
			{
				if ( !color ) { return; }
				const potion = this.stringToPotion( color );
				potion.x = index % 4;
				potion.y = Math.floor( index / 4 );
				this.appendChild( potion );
			} );

			return true;
		}

		private stringToPotion( color: string )
		{
			const potion = <PotionBottleElement>new (customElements.get( BOTTTLE ))();
			potion.fromString( color );
			return potion;
		}
	}


	customElements.whenDefined( BOTTTLE ).then( () =>
	{
		PotionBoard.Init( script.dataset.tagname );
	} );
} );

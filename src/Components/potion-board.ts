interface PotionBoardElement extends HTMLElement
{
}

( ( script, init ) =>
{
	if ( document.readyState !== 'loading' ) { return init( script ); }
	document.addEventListener( 'DOMContentLoaded', () => { init( script ); } );
} )( <HTMLScriptElement>document.currentScript, ( script: HTMLScriptElement ) =>
{
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
				'::slotted( potion-botttle ) { display: block; width: 25%; height: 25%; position: absolute; transition: top 0.5s, left 0.5s; }',
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
	}

	PotionBoard.Init( script.dataset.tagname );
	
} );

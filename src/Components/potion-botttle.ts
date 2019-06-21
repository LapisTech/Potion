interface PotionBottleElement extends HTMLElement
{
	x: number;
	y: number;
	capacity: number;
}

/*
R
G
B
RR
GR
GG
BR
BG
BB
RRR
GRR
BRR
GGR
BGR
BBR
GGG
BGG
BBG
BBB
*/

( ( script, init ) =>
{
	if ( document.readyState !== 'loading' ) { return init( script ); }
	document.addEventListener( 'DOMContentLoaded', () => { init( script ); } );
} )( <HTMLScriptElement>document.currentScript, ( script: HTMLScriptElement ) =>
{
	class PotionBottle extends HTMLElement implements PotionBottleElement
	{
		public static Init( tagname = 'potion-botttle' ) { if ( !customElements.get( tagname ) ) { customElements.define( tagname, this ); } }

		constructor()
		{
			super();

			const shadow = this.attachShadow( { mode: 'open' } );

			const style = document.createElement( 'style' );
			style.textContent =
			[
				':host { display: block; width: 2rem; height: 2rem; }',
			].join( '' );

			const contents = document.createElement( 'div' );
contents.style.width='90%';
contents.style.height='90%';
contents.style.backgroundColor='lightgray';

			shadow.appendChild( style );
			shadow.appendChild( contents );
		}

		get x() { return parseInt( this.getAttribute( 'x' ) || '' ) || 0; }
		set x( value ) { this.setAttribute( 'x', value + '' ); }

		get y() { return parseInt( this.getAttribute( 'y' ) || '' ) || 0; }
		set y( value ) { this.setAttribute( 'y', value + '' ); }

		get capacity() { return parseInt( this.getAttribute( 'capacity' ) || '' ) || 0; }
		set capacity( value ) { this.setAttribute( 'capacity', value + '' ); }

	}

	PotionBottle.Init( script.dataset.tagname );
} );

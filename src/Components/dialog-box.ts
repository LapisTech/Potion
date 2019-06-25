interface DialogBoxElement extends HTMLElement
{
	open: boolean;
	close(): void;
	show(): void;
}

( ( script, init ) =>
{
	if ( document.readyState !== 'loading' ) { return init( script ); }
	document.addEventListener( 'DOMContentLoaded', () => { init( script ); } );
} )( <HTMLScriptElement>document.currentScript, ( script: HTMLScriptElement ) =>
{
	( ( component, tagname = 'dialog-box' ) =>
	{
		if ( customElements.get( tagname ) ) { return; } customElements.define( tagname, component );
	} )( class DialogBox extends HTMLElement implements DialogBoxElement
	{
		constructor()
		{
			super();

			const shadow = this.attachShadow( { mode: 'open' } );

			const style = document.createElement( 'style' );
			style.innerHTML =
			[
				':host { background: rgba( 0, 0, 0, 0.8 ); display: block; opacity: 0; transition: opacity 0.5s; visibility: hidden; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }',
				':host( [open] ) { visibility: visible; opacity: 1; }',
				':host > div { min-width: 20%; max-width: 90%; max-height: 90%; min-height: 1rem; }',
			].join( '' );

			const contents = document.createElement( 'div' );
			contents.appendChild( document.createElement( 'slot' ) );

			shadow.appendChild( style );
			shadow.appendChild( contents );

			contents.addEventListener( 'click', ( event ) => { event.stopPropagation(); } );

			this.addEventListener( 'click', () => { this.close(); } );
		}

		get open() { return this.hasAttribute( 'open' ); }
		set open( value ) { if ( value ) { this.setAttribute( 'open', 'open' ); } else { this.removeAttribute( 'open' ); } }

		public close() { this.open = false; }

		public show() { this.open = true; }

	}, script.dataset.tagname );
} );

/// <reference path="./App.ts" />

( ( script ) =>
{
	if ( !script || !navigator.serviceWorker ) { return; }
	const sw = script.dataset.sw;
	if ( !sw ) { return; }
	const version = ( (<HTMLScriptElement>script).src || '' ).replace( /^[^\?]*(\?.*)$/, '$1' );

	navigator.serviceWorker.register( sw + version, { scope: '.' } ).then( ( registraion ) =>
	{
		registraion.update();
	} );
} )( document.currentScript );

async function UnregisterSW()
{
	if ( navigator.serviceWorker )
	{
		await navigator.serviceWorker.getRegistrations().then( ( registrations ) =>
		{
			return Promise.all( registrations.map( ( registration ) => { registration.unregister(); } ) );
		} );
	}
	if ( 'caches' in window )
	{
		await caches.keys().then( ( keys ) =>
		{
			return Promise.all( keys.map( ( key ) => { return caches.delete( key ); } ) );
		} );
	}
}

document.addEventListener( 'DOMContentLoaded', () =>
{
	Promise.all(
	[
		customElements.whenDefined( 'potion-board' ),
		customElements.whenDefined( 'swipe-area' ),
	] ).then( () =>
	{
		const app = new App(
		{
			board: <PotionBoardElement>document.querySelector( 'potion-board' ),
			swipe: <SwipeAreaElement>document.querySelector( 'swipe-area' ),
		} );
app.start();
	} );
} );

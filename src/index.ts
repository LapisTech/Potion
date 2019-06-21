/// <reference path="./App.ts" />

document.addEventListener( 'DOMContentLoaded', () =>
{
	Promise.all(
	[
		customElements.whenDefined( 'potion-board' ),
		customElements.whenDefined( 'potion-botttle' ),
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

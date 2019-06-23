interface PotionBottleElement extends HTMLElement
{
	x: number;
	y: number;
	capacity: number;
	color: string;
	merge( potion: PotionBottleElement ): boolean;
	remove(): Promise<void>;
	use(): Promise<void>;
}

( ( script, init ) =>
{
	if ( document.readyState !== 'loading' ) { return init( script ); }
	document.addEventListener( 'DOMContentLoaded', () => { init( script ); } );
} )( <HTMLScriptElement>document.currentScript, ( script: HTMLScriptElement ) =>
{

	class PotionBottle extends HTMLElement implements PotionBottleElement
	{
		public static Init( tagname = 'potion-botttle' ) { if ( !customElements.get( tagname ) ) { customElements.define( tagname, this ); } }

		private back: SVGPathElement;
		private front: SVGPathElement;
		constructor()
		{
			super();

			const shadow = this.attachShadow( { mode: 'open' } );

			const style = document.createElement( 'style' );
			style.textContent =
			[
				':host { display: block; width: 2rem; height: 2rem; opacity: 1; --back: #1a1a1a; --front: #464646; }',
				':host > div { width: 100%; height: 100%; transition: opacity 0.5s; }',
				':host( [ disable ] ) > div { opacity: 0; }',
				':host > div > svg { display: block; width: 100%; }',
				':host > div > svg g > path { transition: all 0.5s; }',
				':host( [ color = "0" ] ) { --back: #c81f00; --front: #ff2800; }',
				':host( [ color = "1" ] ) { --back: #bda700; --front: #ffe100; }',
				':host( [ color = "2" ] ) { --back: #090094; --front: #0c00cc; }',
				':host( [ color = "00" ] ) { --back: #aa1a00; --front: #db2200; }',
				':host( [ color = "01" ] ) { --back: #c56300; --front: #ff8101; }',
				':host( [ color = "02" ] ) { --back: #580158; --front: #800180; }',
				':host( [ color = "11" ] ) { --back: #a28f00; --front: #efd300; }',
				':host( [ color = "12" ] ) { --back: #014e01; --front: #018001; }',
				':host( [ color = "22" ] ) { --back: #07006f; --front: #0b00b4; }',
				':host( [ color = "000" ] ) { --back: #970000; --front: #d40000; }',
				':host( [ color = "001" ] ) { --back: #ba4000; --front: #ff5700; }',
				':host( [ color = "002" ] ) { --back: #781c39; --front: #ad2952; }',
				':host( [ color = "111" ] ) { --back: #948300; --front: #cab200; }',
				':host( [ color = "011" ] ) { --back: #a56e00; --front: #ffab01; }',
				':host( [ color = "112" ] ) { --back: #568c01; --front: #80d101; }',
				':host( [ color = "222" ] ) { --back: #040049; --front: #080088; }',
				':host( [ color = "022" ] ) { --back: #372b5c; --front: #5c479a; }',
				':host( [ color = "122" ] ) { --back: #00796c; --front: #009e8c; }',
			].join( '' );


			const contents = document.createElement( 'div' );
			contents.appendChild( this.createSVG() );

			shadow.appendChild( style );
			shadow.appendChild( contents );
		}

		private createSVG()
		{
			const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
			svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
			svg.setAttributeNS( null, 'viewBox', '0 0 100 100' );
			svg.setAttributeNS( null, 'height', '100' );
			svg.setAttributeNS( null, 'width', '100' );
			svg.setAttributeNS( null, 'preserveAspectRatio', 'xMidYMid meet' );

			// Create clippath.
			const clippath = document.createElementNS( 'http://www.w3.org/2000/svg', 'clipPath' );
			clippath.id = 'clip';
			clippath.appendChild( this.createPath( 'M 73.05507,5.055078 C 72.01136,5.055138 71.16529,5.901215 71.16523,6.944922 V 9.776953 L 57.09589,16.811719 C 53.20117,15.578212 49.14047,14.948643 45.05507,14.944922 C 22.96368,14.944922 5.05507,32.853533 5.05507,54.944922 C 5.05507,65.553581 9.26934,75.727738 16.7708,83.229193 C 24.27226,90.730648 34.44641,94.944922 45.05507,94.944922 C 55.66374,94.944922 65.83789,90.730648 73.33935,83.229193 C 80.84081,75.727738 85.05507,65.553581 85.05507,54.944922 C 85.03982,50.873078 84.40293,46.827435 83.1664,42.947852 L 90.22305,28.834766 H 93.05507 C 94.09879,28.834706 94.94486,27.988629 94.94492,26.944922 V 22.944922 C 94.94492,22.443705 94.7458,21.963018 94.3914,21.608594 L 78.3914,5.608594 C 78.03697,5.25419 77.5563,5.055087 77.05507,5.055078 Z', 'fill:#4d4d4d' ) );

			const defs = document.createElementNS( 'http://www.w3.org/2000/svg', 'defs' );
			defs.appendChild( clippath );
			svg.appendChild( defs );

			svg.appendChild( this.createPath( 'M 73.05488,1.0550781 C 69.84958,1.0552631 67.16541,3.7394388 67.16523,6.9447266 A 4.0004,4.0004 0 0 0 67.16523,6.9449219 V 7.3048828 L 56.71699,12.529102 C 52.92169,11.482361 49.00076,10.948512 45.05879,10.944922 A 4.0004,4.0004 0 0 0 45.05508,10.944922 C 20.80193,10.944922 1.05508,30.691772 1.05508,54.944922 C 1.05508,66.61291 5.69187,77.807103 13.94238,86.057617 C 22.1929,94.308133 33.38709,98.944922 45.05508,98.944922 C 56.72308,98.944922 67.91727,94.308133 76.16777,86.057617 C 84.41829,77.807103 89.05508,66.612909 89.05508,54.944922 A 4.0004,4.0004 0 0 0 89.05508,54.929883 C 89.04037,51.004155 88.49999,47.10073 87.45098,43.322852 L 92.69512,32.834766 H 93.05508 A 4.0004,4.0004 0 0 0 93.05527,32.834766 C 96.26057,32.834581 98.94474,30.150405 98.94492,26.945117 A 4.0004,4.0004 0 0 0 98.94492,26.944922 V 22.944922 C 98.94492,21.384363 98.32328,19.883714 97.21992,18.780273 A 4.0004,4.0004 0 0 0 97.21992,18.780078 L 81.21992,2.7800781 A 4.0004,4.0004 0 0 0 81.21973,2.7800781 C 80.11631,1.6767262 78.61555,1.0551061 77.05508,1.0550781 H 73.05508 A 4.0004,4.0004 0 0 0 73.05488,1.0550781 Z M 73.05508,5.0550781 H 77.05508 C 77.55631,5.0550871 78.03698,5.2541897 78.39141,5.6085938 L 94.39141,21.608594 C 94.74581,21.963018 94.94492,22.443705 94.94492,22.944922 V 26.944922 C 94.94486,27.988629 94.0988,28.834706 93.05508,28.834766 H 90.22305 L 83.16641,42.947852 C 84.40294,46.827435 85.03983,50.873078 85.05508,54.944922 C 85.05508,65.553581 80.84072,75.727647 73.33926,83.229102 C 65.8378,90.730557 55.66375,94.944922 45.05508,94.944922 C 34.44642,94.944922 24.27216,90.730557 16.7707,83.229102 C 9.26924,75.727647 5.05508,65.553581 5.05508,54.944922 C 5.05508,32.853533 22.96369,14.944922 45.05508,14.944922 C 49.14048,14.948643 53.20118,15.578212 57.0959,16.811719 L 71.16523,9.7769531 V 6.9449219 C 71.16529,5.9012149 72.01137,5.0551381 73.05508,5.0550781 Z', 'fill:#1a1a1a' ) );

			this.back = this.createPath( this.liquid(), 'fill:var(--back)' );
			this.front = this.createPath( this.liquid(), 'fill:var(--front)' );
			const g = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
			g.setAttributeNS( null, 'clip-path', 'url(#clip)' );
			g.appendChild( this.back );
			g.appendChild( this.front );
			svg.appendChild( g );

			svg.appendChild( this.createPath( 'M 73.055078,5.0550781 C 72.011368,5.0551381 71.165294,5.9012149 71.165234,6.9449219 V 9.7769531 L 57.095898,16.811719 C 53.201178,15.578212 49.140478,14.948643 45.055078,14.944922 C 22.963688,14.944922 5.0550781,32.853533 5.0550781,54.944922 C 5.0550781,65.553581 9.2694384,75.727647 16.770898,83.229102 C 24.272358,90.730557 34.446418,94.944922 45.055078,94.944922 C 55.663748,94.944922 65.837798,90.730557 73.339258,83.229102 C 80.840718,75.727647 85.055078,65.553581 85.055078,54.944922 C 85.039828,50.873078 84.402936,46.827435 83.166406,42.947852 L 90.223047,28.834766 H 93.055078 C 94.098798,28.834706 94.944862,27.988629 94.944922,26.944922 V 22.944922 C 94.944922,22.443705 94.745806,21.963018 94.391406,21.608594 L 78.391406,5.6085938 C 78.036976,5.2541897 77.556308,5.0550872 77.055078,5.0550781 Z M 75.331836,9.2216797 H 76.111914 L 90.77832,23.888086 V 24.668164 H 90.223047 A 4.1670831,4.1670831 0 0 0 86.496289,26.971289 L 79.439648,41.084375 A 4.1670831,4.1670831 0 0 0 79.196484,44.213086 C 80.303384,47.685947 80.873781,51.307401 80.888281,54.952344 C 80.886301,64.454849 77.112594,73.563578 70.393164,80.283008 C 63.671984,87.004192 54.560268,90.77832 45.055078,90.77832 C 35.549898,90.77832 26.438172,87.004192 19.716992,80.283008 C 12.995792,73.561823 9.2216797,64.450114 9.2216797,54.944922 C 9.2216797,35.106611 25.213547,19.113528 45.051367,19.111523 C 48.711207,19.114856 52.348861,19.678965 55.837891,20.783984 A 4.1670831,4.1670831 0 0 0 58.959375,20.538477 L 73.028711,13.503711 A 4.1670831,4.1670831 0 0 0 75.331836,9.7769531 Z M 44.422266,24.951562 C 34.983286,25.150706 26.184449,29.784735 20.680469,37.455469 A 2.0002,2.0002 0 1 0 23.930469,39.787305 C 28.702499,33.136675 36.322911,29.123442 44.506641,28.950781 A 2.0002,2.0002 0 1 0 44.422266,24.951562 Z M 52.283984,25.899023 A 2,2 0 0 0 50.370117,27.381445 A 2,2 0 0 0 51.784375,29.830859 A 2,2 0 0 0 54.233789,28.416602 A 2,2 0 0 0 52.819727,25.967188 A 2,2 0 0 0 52.283984,25.899023 Z M 70.745703,64.051562 A 2.0002,2.0002 0 0 0 68.911719,65.282422 C 65.869829,72.302412 59.893546,77.624211 52.569336,79.835352 C 45.245106,82.046493 37.322382,80.920659 30.904102,76.756641 A 2.0002,2.0002 0 1 0 28.727148,80.112305 C 36.130568,84.915455 45.276981,86.215174 53.725391,83.664648 C 62.173791,81.114121 69.073046,74.970333 72.581836,66.872852 A 2.0002,2.0002 0 0 0 70.745703,64.051562 Z', 'fill:#f2f2f2' ) );
			return svg;
		}

		private createPath( d: string, style: string )
		{
			const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
			path.setAttributeNS( null, 'd', d );
			path.setAttributeNS( null, 'style', style );
			return path;
		}

		private liquid( type: number = 1 )
		{
			const h = 90 - this.capacity * 20;
			const l = h + ( type % 3 - 1 ) * 30;
			const r = h - ( type % 3 - 1 ) * 30;
			return `M 0,${h} V 100 H 100 V ${h} C 50,${l} 50,${r} 0,${h} Z`;
		}

		private shakeSync( type: number )
		{
			this.back.setAttributeNS( null, 'd', this.liquid( type ) );
			this.front.setAttributeNS( null, 'd', this.liquid( 2 - type ) );
		}

		private shake( type: number, wait: number )
		{
			return new Promise<void>( ( resolve ) =>
			{
				setTimeout( () =>
				{
					this.shakeSync( type );
					resolve();
				}, wait );
			} );
		}

		private async update()
		{
			this.shakeSync( 0 );
			await this.shake( 2, 500 );
			await this.shake( 1, 500 );
		}

		get x() { return parseInt( this.getAttribute( 'x' ) || '' ) || 0; }
		set x( value ) { this.setAttribute( 'x', value + '' ); }

		get y() { return parseInt( this.getAttribute( 'y' ) || '' ) || 0; }
		set y( value ) { this.setAttribute( 'y', value + '' ); }

		get capacity() { return parseInt( this.getAttribute( 'capacity' ) || '' ) || 0; }
		set capacity( value ) { this.setAttribute( 'capacity', value + '' ); }

		get color() { return this.getAttribute( 'color' ) || ''; }
		set color( value ) { this.setAttribute( 'color', ( value + '' ).split( '' ).sort().join( '' ) ); }

		public merge( potion: PotionBottleElement )
		{
			const a = this.capacity;
			const b = potion.capacity;
			if ( 3 < a + b ) { return false; }
			this.color += potion.color;
			this.capacity = a + b;
			potion.remove();
			return true;
		}

		public remove()
		{
			this.setAttribute( 'disable', 'disable' );
			return new Promise<void>( ( resolve ) =>
			{
				setTimeout( () =>
				{
					const p = this.parentElement;
					if ( p ) { p.removeChild( this ); }
					resolve();
				}, 500 );
			} );
		}

		public use()
		{
			return new Promise<void>( ( resolve ) =>
			{
				setTimeout( () =>
				{
					this.remove();
					resolve();
				}, 1000 );
			} );
		}
		
		static get observedAttributes() { return [ 'capacity' ]; }

		public attributeChangedCallback( attrName: string, oldVal: any , newVal: any )
		{
			if ( oldVal === newVal ) { return; }
	
			this.update();
		}
	}

	PotionBottle.Init( script.dataset.tagname );
} );

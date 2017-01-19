/*

Lazer Linez - add some rad

Version 	: 0.1
Repository 	: https://github.com/andrewtibbetts/LazerLinez
Author 		: Andrew Tibbetts
License 	: MIT, GPL

*/

(function( $ ){

var lazerlinez_defaultz = {
	'start_color' : 'goldenrod', // beginning color of the linez
	'end_color' : '#b2d', // ending color of the linez
	'first_gap' : .1, // thickness % of first space
	'first_line' : 6, // thickness % of first line
	'last_gap' : 6, // thickness % of last space
	'last_line' : .1, // thickness % of last line
	'num_linez' : 16, // number of linez
	'position' : 'top', // from which edge
	'z' : '1' // z-index
};

$.fn.lazerlinez = function( optionz ) {

	this.each((function(){
		
		return function(){
	
			var o = $.extend({}, lazerlinez_defaultz, optionz);

			var $this = $(this);
			var $lazer = $('<div class="lazer"/>');
			var $linez = [];
			var edge = {};
			var start_at = 0;
			var colorz = {};
			var $colorz = $('<span/>');
			
			// styling an element in the dom will return rgb
			$colorz.appendTo('body');
			$colorz.css('background-color',o.start_color);
			colorz.start = $colorz.css('background-color');
			$colorz.css('background-color',o.end_color);
			colorz.end = $colorz.css('background-color');
			$colorz.remove();
				
			colorz.match = {};
			colorz.match.start_match = colorz.start.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
			colorz.start_red = parseInt( colorz.match.start_match[1] );
			colorz.start_green = parseInt( colorz.match.start_match[2] );
			colorz.start_blue = parseInt( colorz.match.start_match[3] );
			colorz.match.end_match = colorz.end.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
			colorz.end_red = parseInt( colorz.match.end_match[1] );
			colorz.end_green = parseInt( colorz.match.end_match[2] );
			colorz.end_blue = parseInt( colorz.match.end_match[3] );

			colorz.getting = {};
			colorz.getting.redder = ( colorz.start_red > colorz.end_red ) ? false : true;
			colorz.getting.greener = ( colorz.start_green > colorz.end_green ) ? false : true;
			colorz.getting.bluer = ( colorz.start_blue > colorz.end_blue ) ? false : true;
			
			switch ( o.position ) {
				
				case 'top':
				case 'bottom':
					edge.other = 'left';
					edge.grow = 'height';
					edge.full = 'width';
					break;
				
				case 'left':
				case 'right':
					edge.other = 'top';
					edge.grow = 'width';
					edge.full = 'height';
					break;
			}
			
			for ( var i = 0; i < o.num_linez; i++ ) {
				
				var width_gap = parseFloat( o.first_gap + ( i * ( ( o.last_gap - o.first_gap ) / ( o.num_linez - 1 ) ) ) );
				var width_line = parseFloat( o.first_line - ( i * ( ( o.first_line - o.last_line ) / ( o.num_linez - 1 ) ) ) );
				
				colorz.diff = {};
				colorz.diff.red = parseInt( Math.abs( colorz.start_red - colorz.end_red ) / o.num_linez * i );
				colorz.diff.green = parseInt( Math.abs( colorz.start_green - colorz.end_green ) / o.num_linez * i );
				colorz.diff.blue = parseInt( Math.abs( colorz.start_blue - colorz.end_blue ) / o.num_linez * i );
				
				colorz.red = ( colorz.getting.redder ) ? parseInt( colorz.start_red ) + parseInt( colorz.diff.red ) : parseInt( colorz.start_red ) - parseInt( colorz.diff.red );
				colorz.green = ( colorz.getting.greener ) ? parseInt( colorz.start_green ) + parseInt( colorz.diff.green ) : parseInt( colorz.start_green ) - parseInt( colorz.diff.green );
				colorz.blue = ( colorz.getting.bluer ) ? parseInt( colorz.start_blue ) + parseInt( colorz.diff.blue ) : parseInt( colorz.start_blue ) - parseInt( colorz.diff.blue );

				var linez_stylez = {};
				linez_stylez['position'] = 'absolute';
				linez_stylez['background-color'] = 'rgb('+colorz.red+','+colorz.green+','+colorz.blue+')';
				linez_stylez[o.position] = parseFloat( start_at + width_gap ) + '%';
				linez_stylez[edge.other] = 0;
				linez_stylez[edge.grow] = width_line+'%';
				linez_stylez[edge.full] = '100%';
				
				$linez[i] = $('<div class="linez"/>').css(linez_stylez);
				
				start_at = start_at + width_gap + width_line;
			}
			
			var lazer_stylez = {};
			lazer_stylez['position'] = 'absolute';
			lazer_stylez['z-index'] = o.z;
			lazer_stylez[o.position] = 0;
			lazer_stylez[edge.other] = 0;
			lazer_stylez[edge.full] = '100%';
			lazer_stylez[edge.grow] = start_at;
			lazer_stylez['max-'+edge.grow] = $this.css(edge.grow);
			lazer_stylez['overflow'] = 'hidden';
			
			$lazer.html($linez).css(lazer_stylez);
			
			$this.prepend($lazer);
		};

	})());
}

})( jQuery );
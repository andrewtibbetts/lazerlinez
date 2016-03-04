/*

Lazer Linez - add some rad

Version 	: 0.1
Repository 	: https://github.com/andrewtibbetts/LazerLinez
Author 		: Andrew Tibbetts
License 	: MIT, GPL

*/

(function( $ ){

var lazerlinez_defaultz = {
	'color' : '#fff', // color of the linez
	'first_gap' : 1, // width of first space
	'first_line' : 10, // width of first line
	'last_gap' : 5, // width of last space
	'last_line' : 1, // width of last line
	'num_linez' : 20, // number of linez
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
				
				var width_gap = Math.ceil( o.first_gap + ( i * ( ( o.last_gap - o.first_gap ) / ( o.num_linez - 1 ) ) ) );
				var width_line = Math.ceil( o.first_line - ( i * ( ( o.first_line - o.last_line ) / ( o.num_linez - 1 ) ) ) );
				
				var lazer_stylez = {};
					lazer_stylez['position'] = 'absolute';
					lazer_stylez['background-color'] = o.color;
					lazer_stylez[o.position] = start_at + width_gap;
					lazer_stylez[edge.other] = 0;
					lazer_stylez[edge.grow] = width_line;
					lazer_stylez[edge.full] = '100%';
				
				$linez[i] = $('<div class="linez"/>').css(lazer_stylez);
				
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
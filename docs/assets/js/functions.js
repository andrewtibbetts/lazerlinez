// @codekit-prepend '../../bower_components/jquery/dist/jquery.slim.js', '../../../jquery.lazerlinez.js';


(function( $ ){


$(document).ready(function(){
	
	var bodyW = $('body').width();
	var bodyH = $('body').height();

	$('body').lazerlinez();



	/* the rest is just additional, glammy 80s eye candy */

	function makeSVG( tag, attrs ) {

		var el = document.createElementNS( 'http://www.w3.org/2000/svg', tag );

		for ( var k in attrs ) {

			el.setAttribute( k, attrs[k] );
		}

		return el;
	}
	
	$('.grid').attr('viewBox','0 0 '+bodyW*3+' '+bodyH);
	$('.grid ellipse').attr({ 'cx': bodyW*1.5, 'cy': bodyH/1.5, 'rx': bodyW/2, 'ry': bodyH/3 });

	$('.mountainz').attr('viewBox','0 0 '+bodyW+' '+bodyH);

	var horizon_point = bodyH/1.5;
	var num_peakz = bodyW/50;
	var mountain_topz = "";

	for ( var m = 0; m < num_peakz; m++ ) {

		var mx = bodyW - ( bodyW / num_peakz * m );
		var my = horizon_point - ( Math.random()*(bodyH/20) );
		mountain_topz += mx+','+my+' ';
	}

	var mountainz = makeSVG( 'polygon', { 'points': '0,'+bodyH+' '+bodyW+','+bodyH+' '+bodyW+','+horizon_point+' '+mountain_topz+'0,'+horizon_point, 'fill': 'black' });

	$(mountainz).prependTo('.mountainz');

	var num_grid_lines = 40;
	var grid_spacing = parseInt((bodyW*3)/num_grid_lines);

	for ( var vl = 0; vl <= num_grid_lines; vl++ ) {

		var grid_line = makeSVG( 'path', { 'd': 'M'+grid_spacing*vl+',0 L'+grid_spacing*vl+','+bodyH, 'class': 'grid-line grid-line-vertical' });

		$(grid_line).appendTo('.grid');
	}

	for ( var hl = 0; hl <= parseInt(bodyH/grid_spacing); hl++ ) {

		var grid_line = makeSVG( 'path', { 'd': 'M0,'+grid_spacing*hl+' L'+bodyW*3+','+grid_spacing*hl, 'class': 'grid-line grid-line-horizontal' });

		$(grid_line).appendTo('.grid');
	}
});


	

})( jQuery );
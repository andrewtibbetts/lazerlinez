// @codekit-prepend '../../bower_components/jquery/dist/jquery.js', 'arrive.min.js', '../../../jquery.lazerlinez.js';


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


function makeSVG( tag, attrs ) {

	var el = document.createElementNS( 'http://www.w3.org/2000/svg', tag );

	for ( var k in attrs ) {

		el.setAttribute( k, attrs[k] );
	}

	return el;
}



(function($){


function domino_fade_in( $fade_el ){

	$fade_el.eq(0).addClass('show');
	$fade_el = $fade_el.slice(1);

	if ($fade_el.length) {

		setTimeout( function(){ domino_fade_in($fade_el); }, 200 );
	}
}

	
	
var lazer_settingz = {
	'start_color' : 'goldenrod', // beginning color of the linez
	'end_color' : '#b2d', // ending color of the linez
	'first_gap' : .2, // thickness % of first space
	'first_line' : 4, // thickness % of first line
	'last_gap' : 4, // thickness % of last space
	'last_line' : .1, // thickness % of last line
	'num_linez' : 10, // number of linez
	'position' : 'top', // from which edge - top, right, bottom, left
	'extend_start' : 55, // thickness % of additional start_color
	'z' : '1',
	'add_class' : '' // additional classes
};

function reset_lazer() {
		
	$('.lazer').remove();
		
	$('body').lazerlinez({
		'start_color' : lazer_settingz.start_color, // beginning color of the linez
		'end_color' : lazer_settingz.end_color, // ending color of the linez
		'first_gap' : lazer_settingz.first_gap, // thickness % of first space
		'first_line' : lazer_settingz.first_line, // thickness % of first line
		'last_gap' : lazer_settingz.last_gap, // thickness % of last space
		'last_line' : lazer_settingz.last_line, // thickness % of last line
		'num_linez' : lazer_settingz.num_linez, // number of linez
		'position' : lazer_settingz.position, // from which edge - top, right, bottom, left
		'extend_start' : lazer_settingz.extend_start, // thickness % of additional start_color
		'z' : lazer_settingz.z,
		'add_class' : lazer_settingz.add_class // additional classes
	});
}


$(document).ready(function(){
	
	var bodyW = $('body').width();
	var bodyH = $('body').height();

	$('body').lazerlinez({ 'add_class': 'fade_in_on_load' });
	
	$('.grid').attr('viewBox','0 0 '+bodyW*3+' '+bodyH);
	$('.grid ellipse').attr({ 'cx': bodyW*1.5, 'cy': bodyH/1.5, 'rx': bodyW/2, 'ry': bodyH/3 });

	$('.mountainz').attr('viewBox','0 0 '+bodyW+' '+bodyH);

	var horizon_point = bodyH/1.5;
	var num_peakz = bodyW/50;
	var mountain_topz = "";

	for ( var m = Math.floor(num_peakz/-2); m <= Math.ceil(num_peakz/2); m++ ) {

		var py = m * m;
		var mx = bodyW / num_peakz * ( m + Math.ceil(num_peakz/2) );
		var my = horizon_point - ( Math.random()*(bodyH/20) ) - py;
		mountain_topz += mx+','+my+' ';
	}

	var mountainz = makeSVG( 'polygon', { 'points': bodyW+','+bodyH+' 0,'+bodyH+' 0,'+horizon_point+' '+mountain_topz, 'fill': 'black' });

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
	
	$('.settings-toggle').on('click',function(e){
		
		e.preventDefault();
		
		$('body').toggleClass('settings-open');
	});
	
	$('.info-toggle').on('click',function(e){
		
		e.preventDefault();
		
		$('.info').toggleClass('open');
	});
	
	$('.setting').on( 'change', debounce( function(){
		
		var key = $(this).attr('name');
		
		if ( $(this).attr('type') == 'number' ) {
		
			lazer_settingz[key] = parseInt( $(this).val() );
		}
		else {
		
			lazer_settingz[key] = $(this).val();
		}
		
		lazer_settingz.add_class = 'fade_in_on_load show';

		reset_lazer();

	}, 500 ));
	
	$('.setting-position').on( 'click', function(){
		
		$('.setting-position').removeClass('on');
		$(this).addClass('on');
		
		var key = $(this).attr('name');
		
		lazer_settingz[key] = $(this).val();

		reset_lazer();

	});

});

	
$(document).arrive('.lazer',function(){
	
	domino_fade_in( $('.fade_in_on_load') );
});


$(window).on('load',function(){
	
});


$(window).on('resize',debounce( function(){
	
	$('.mountainz,.lazerlinez-text,.grid').addClass('show');
	
}, 500 )).on('resize',debounce( function(){
	
	$('.mountainz,.lazerlinez-text,.grid').removeClass('show');
	
}, 500, true ));
	

})(jQuery);
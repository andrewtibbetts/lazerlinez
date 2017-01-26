# Lazer Linez
### Add some rad.

#### Demo: http://addsomerad.com

## Usage

```javascript
$('body').lazerlinez();
```

**With Options** *(defaults shown)*
```javascript
$('.lazer_this_element_up').lazerlinez({
	'start_color' : 'goldenrod', // beginning color of the linez
	'end_color' : '#b2d', // ending color of the linez
	'first_gap' : .2, // thickness % of first space
	'first_line' : 4, // thickness % of first line
	'last_gap' : 4, // thickness % of last space
	'last_line' : .1, // thickness % of last line
	'num_linez' : 10, // number of linez
	'position' : 'top', // from which edge - top, right, bottom, left
	'extend_start' : 55, // thickness % of additional start_color
	'z' : '1', // z-index of created .lazer element
	'add_class' : '' // additional classes
});
```
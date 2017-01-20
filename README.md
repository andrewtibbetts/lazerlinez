# Lazer Linez
### Add some rad.

#### Demo: http://codepen.io/varystrategic/pen/ZWbQPq

## Usage

```javascript
$('body').lazerlinez();
```

**With Options** *(defaults shown)*
```javascript
$('.lazer_this_element_up').lazerlinez({
	'start_color' : 'goldenrod', // beginning color of the linez
	'end_color' : '#b2d', // ending color of the linez
	'first_gap' : .1, // thickness % of first space
	'first_line' : 6, // thickness % of first line
	'last_gap' : 6, // thickness % of last space
	'last_line' : .1, // thickness % of last line
	'num_linez' : 16, // number of linez
	'position' : 'top', // from which edge
	'z' : '1' // z-index
});
```
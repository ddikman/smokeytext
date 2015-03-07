 
var applyDefaultOptions = function(options){

	options.distance = options.distance || { x: 10, y: 70 };
	options.duration = options.duration || 1000;
	options.swings = options.swings || 3;
	return options;
};

var getRandomRange = function(min, max){
	var amount = Math.random();
	var range = max - min;
	var scaled = min + range * amount;
	return scaled;
};

var getRotation = function(amount, targetSkew, targetRotate){
	var skew = Math.round(targetSkew * amount, 0);
	var rotate = Math.round(targetRotate * amount, 0);
	return 'rotate(' + rotate + 'deg) skew(' + skew + 'deg, 0)';
};

var getBlur = function(element, amount){
	var color = $(element).css('color');
	var blur = Math.round(amount * 30, 0);
	var blurCss = '0 0 ' + blur + 'px ' + color;
	return blurCss;
};

var animateCharacter = function(text, characterIndex, options){
	
	var className = '.char' + characterIndex;
	var charElement = $(text.find(className)[0]);
	
	var color = randomColor();
	charElement.css({
		color: color,
		display: 'inline-block'
	});

	var offset = charElement.offset();
	charElement.offset(offset);

	var yDistance = getRandomRange(-options.distance.y * 0.5, -options.distance.y);
	for(k = 0; k < options.swings; ++k)
	{
		var xDistance = getRandomRange(-options.distance.x, options.distance.x);

		charElement.animate({
			top: ((yDistance / options.swings) * (k + 1)) + 'px',
			left: xDistance + 'px',
		}, {
			duration: options.duration / options.swings,
			easing: 'linear'
		});
	}

	var targetSkew = (Math.random() * 2 - 1) * 45;
	var targetRotate = (Math.random() * 2 - 1) * 145;
	charElement.animate(
		{
			opacity: 0,
		}, 
		{
			queue: false, 
			duration: options.duration,
			step: function(now, fx){
				var amount = 1.0 - now;
				var rotation = getRotation(amount, targetSkew, targetRotate);
				$(this).css({
					'transform': rotation,
					'-webkit-transform': rotation,
					'-moz-transform': rotation,
					'-o-transform': rotation,
					'transform': rotation,
					'text-shadow': getBlur(this, amount),
				});
			}});
};

var fixPosition = function(element){
	element.css({position: 'relative'});
};

var smoke = function(options){
	
	options = applyDefaultOptions(options);
	this.lettering();
	fixPosition(this);
	var characters = this.text().length;
	for(i = 1; i <= characters; ++i) {
		animateCharacter(this, i, options);
	}
}


// Extend $ with smoke method
jQuery.fn.extend({
	smoke: smoke
});
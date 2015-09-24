/*
 * CSS Animations Manager
 * */
(function($, window, document, undefined){
	'use strict';

	var CssAnimationManager = function(){
		this.__construct();
	};

	var proto = CssAnimationManager.prototype;
	proto.testingDOM 	  = document.createElement("div");
	proto.prefixes   	  = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
	proto.cssEasing  	  = {
		'linear'     : 'linear',
		'ease'       : 'ease',
		'in'         : 'ease-in',
		'out'        : 'ease-out',
		'inOut'      : 'ease-in-out',

		'cubicIn'    : 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
		'cubicOut'   : 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		'cubicInOut' : 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

		'circIn'     : 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
		'circOut'    : 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
		'circInOut'  : 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

		'expoIn'     : 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
		'expoOut'    : 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
		'expoInOut'  : 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

		'quadIn'     : 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
		'quadOut'    : 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
		'quadInOut'  : 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

		'quartIn'    : 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
		'quartOut'   : 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		'quartInOut' : 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

		'quintIn'    : 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
		'quintOut'   : 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
		'quintInOut' : 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

		'sineIn'     : 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
		'sineOut'    : 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
		'sineInOut'  : 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

		'backIn'     : 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
		'backOut'    : 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
		'backInOut'  : 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
	};

	proto.defaultFallback = {
		'translate': function(params, clear) {
			var attrs = {left:(clear) ? '' : params.x, top:(clear) ? '' : params.y};
			Tweenlite.to(params.$el, params.duration, attrs);
		}
	};

	proto.defautAttributes = {
		$el: null,
		duration: 1,
		ease: 'linear',
		props: 'all',
		onComplete: function() {}
	};

	//--------Methods--------//
	proto.__construct = function() {
	};

	proto.translate = function(params) {
		var key = 'transform';
		if (!this.cssTranslateEnabled) this.cssTranslateEnabled = this.detectFeature(key, 'translate3d(0px, 0px, 0px)', /translate3d\(0px, 0px, 0px\)/g);

		var attributes = {
			x:0,
			y:0,
			z:0,
			fallback:this.defaultFallback.translate
		};
		attributes = $.extend({}, this.defautAttributes, attributes, params);
		if (!attributes.$el) {console.warn("you need an $el"); return;}

		if (attributes.$el.isAnimating) {return;}
		attributes.$el.isAnimating = true;

		var scope = this;
		if (this.cssTranslateEnabled) {
			attributes.$el.css(scope.makeCssTransition(attributes));
			attributes.$el.css(scope.makeCssObj(key, 'translate3d(' + attributes.x + ', ' + attributes.y + ', ' + attributes.z + ')'));
		} else {
			attributes.fallback.call(this, attributes);
		}

		setTimeout(function() {
			if (attributes.duration != 0) {
				if (scope.cssTranslateEnabled) {
					attributes.$el.css(scope.makeCssTransition(attributes, true));
					attributes.$el.css(scope.makeCssObj(key, 'translate3d(' + attributes.x + ', ' + attributes.y + ', ' + attributes.z + ')', true));
				} else {
					attributes.fallback.call(this, attributes, true);
				}
			}
			attributes.$el.isAnimating = false;
			attributes.onComplete.call(this, attributes);
		}, attributes.duration * 1000);
	};

	proto.makeCssTransition = function(params, clear) {
		var obj = {};
		for (var i=0; i<this.prefixes.length; i++) {
			obj[this.prefixes[i] + 'transition'] = (clear) ? '' : (params.props + " " + params.duration + "s " + this.cssEasing[params.ease]);
		}
		return obj;
	};

	proto.makeCssObj = function(key, css, clear) {
		var obj = {};
		for (var i=0; i<this.prefixes.length; i++) {
			obj[this.prefixes[i] + key] = (clear) ? '' : css;
		}
		return obj;
	};

	proto.detectFeature = function(key, css, regexp) {
		this.testingDOM.style.cssText = this.makeCssString(key, css);
		var supported = this.testingDOM.style.cssText.match(regexp);
		return (supported !== null && supported.length > 0);
	};

	proto.makeCssString = function(key, css) {
		var string = "";
		for (var i=0; i<this.prefixes.length; i++) {
			string += this.prefixes[i] + key + ":" + css + ";";
		}
		return string;
	};

	window.CSSAnimationManager = new CssAnimationManager();
}(jQuery, window, document));
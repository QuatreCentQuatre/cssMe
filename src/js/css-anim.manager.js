/*
 * CSS Animations Manager
 * */
(function ($, window, document, undefined) {
	'use strict';

	var CssAnimationManager = function () {
		this.__construct();
	};

	var proto = CssAnimationManager.prototype;

	//--------Methods--------//
	proto.__construct = function () {
	};

	proto.$el = function (scope, $el) {
		var animationClass = new subAnimationClass(scope, $el);
		return animationClass;
	};

	proto.addTransitions = function (scope, $el) {
		$el.addClass('transitions');
		setTimeout(function () {
			return $el;
		}, 250);
	};

	var subAnimationClass = function (scope, $el) {
		this.scope = scope;
		this.$el = $el;
	};

	var proto = subAnimationClass.prototype;
	proto.addTransitions = function (callback) {
		this.$el.addClass('transitions');
		var scope = this;
		setTimeout(function() {
			callback.call(scope);
		}, 250);
		return this;
	}

	proto.removeTransitions = function (callback) {
		this.$el.removeClass('transitions');
		var scope = this;
		callback.call(scope);
		return this;
	};

	proto.addClass = function (className, milliseconds, callback) {
		this.$el.addClass(className);
		var scope = this;
		setTimeout(function() {
			callback.call(scope);
		}, milliseconds);
		return this;
	};

	proto.removeClass = function (className, milliseconds, callback) {
		this.$el.removeClass(className);
		var scope = this;
		setTimeout(function() {
			callback.call(scope);
		}, milliseconds);
		return this;
	};
	window.CSSTween = new CssAnimationManager();
}(jQuery, window, document));
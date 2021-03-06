/* istanbul ignore next */
if (typeof window === 'undefined') {
   window = (<any>{ audioContext: function () { return; } });
}
/* istanbul ignore next */
if (typeof window !== 'undefined' && !window.requestAnimationFrame) {
   (<any>window).requestAnimationFrame =
   (<any>window).webkitRequestAnimationFrame ||
   (<any>window).mozRequestAnimationFrame ||
   function (callback) { window.setInterval(callback, 1000 / 60); };
}
/* istanbul ignore next */
if (typeof window !== 'undefined' && !window.cancelAnimationFrame) {
   (<any>window).cancelAnimationFrame =
   (<any>window).webkitCancelAnimationFrame ||
   (<any>window).mozCancelAnimationFrame ||
   function (callback) { return; };
}
/* istanbul ignore next */
if (typeof window !== 'undefined' && !(<any>window).AudioContext) {
   (<any>window).AudioContext = (<any>window).AudioContext || 
                                (<any>window).webkitAudioContext || 
                                (<any>window).mozAudioContext || 
                                (<any>window).msAudioContext || 
                                (<any>window).oAudioContext;
}

// Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
/* istanbul ignore next */
if (!Array.prototype.forEach) {

   Array.prototype.forEach = function (callback, thisArg) {

      var T, k;

      if (this == null) {
         throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling ToObject passing the |this| value as the argument. 
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
         throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
         T = thisArg;
      }

      // 6. Let k be 0
      k = 0;

      // 7. Repeat, while k < len
      while (k < len) {

         var kValue;

         // a. Let Pk be ToString(k).
         //   This is implicit for LHS operands of the in operator
         // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
         //   This step can be combined with c
         // c. If kPresent is true, then
         if (k in O) {

            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[k];

            // ii. Call the Call internal method of callback with T as the this value and
            // argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
         }
         // d. Increase k by 1.
         k++;
      }
      // 8. return undefined
   };
}

// Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
/* istanbul ignore next */
if (!Array.prototype.some) {
  Array.prototype.some = function(fun /*, thisArg */){
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}

// Polyfill from  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
/* istanbul ignore next */
if (!Function.prototype.bind) {
   Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
         // closest thing possible to the ECMAScript 5
         // internal IsCallable function
         throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
         fToBind = this,
         fNOP = function () { return; },
         fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
               ? this
               : oThis,
               aArgs.concat(Array.prototype.slice.call(arguments)));
         };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
   };
}
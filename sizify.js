var sizify = new function () {
   'use strict';
   
   var DEFAULT_CLASS = null,
   
       // default dimension values
       DEFAULT_DIMENSIONS = {
          small: 800,
          medium: 1280
       },
   
       // hold global variables (for minifying purposes)
       _document = document,
       _window = window,
       _body = _document.body || _document.getElementsByTagName('body')[0],
                  
       _clientWidth = _window.innerWidth || 0,
       
       _currentClass = '',
       _defaultClass = DEFAULT_CLASS,
       
       _variations = [],
       _numVariations = 0;
   
   // helper class which holds a size max border and the appropriate classname
   var Variation = function (size, className) {
      this.size = size;
      this.className = className;
   };
   
   var _addClass = function (element, className) {
      // get the current class attribute of the body and append the new one
      var _elementClasses = element.getAttribute('class'),
          _classNames = _elementClasses && (_elementClasses + ' ' + className) || className;
      
      // add the class string to body's class attribute if className is not null
      className !== null && element.setAttribute('class', _classNames);   
   };
   
   var _removeClass = function (element, className) {
      var _elementClasses = element.getAttribute('class'),
          _classRegexp;
      
      // when the class attribute is set on the body then remove the current class
      if (_elementClasses) {
         _classRegexp = new RegExp('(?:\\s(?=' + className + '$))?' + className + '\\s?');          
         element.setAttribute('class', _elementClasses.replace(_classRegexp, ''));   
      }
   };
   
   var _updateSizeClass = function (className) {
      var _bodyClass = _body.getAttribute('class') || '';
      
      // remove current size class
      _removeClass(_body, _currentClass);
      
      // set new class name to body
      _currentClass = className;
      _addClass(_body, className);
      
      // remove class if class string is empty
      !_bodyClass.trim() && className === null && _body.removeAttribute('class');
   };
   
   var _checkSize = function () {
      var i = _numVariations,
          variation,
          smallerVariation,
          max = 0,
          min = 0;
      
      _clientWidth = _window.innerWidth;
      
      while (i--) {
         variation = _variations[i];
         smallerVariation = _variations[i-1];
         max = variation.size;
         
         // get the lower border for the current variation;
         // this is the value of the next lower variation or 0
         min = smallerVariation && smallerVariation.size || 0;
         
         if (_clientWidth > min && _clientWidth <= max) {
            // if class not already the current one then apply it to the body
            variation.className !== _currentClass &&_updateSizeClass(variation.className);
            
            // return on applied change to skip all further checks and settings
            return;
         }
      }
      
      _updateSizeClass(_defaultClass);
   };
   
   // actual returned function
   return function (dimensions) {
      dimensions = dimensions || DEFAULT_DIMENSIONS || {};
      
      for (var i in dimensions) {
         if (dimensions.hasOwnProperty(i)) {
            // if value is a number than add a new variation instance to the global array 
            Number(dimensions[i]) && _variations.push(new Variation(Number(dimensions[i]), i));
         }
      }
      
      // get the defined default class or take it from DEFAULT_CLASS
      _defaultClass = 'default' in dimensions 
                           ? dimensions['default'] 
                           : DEFAULT_CLASS;
      
      // save the length for not reading it newly all the time
      _numVariations = _variations.length;

      // sort the variations ascending for later checking the current size properly
      _variations.sort(function (a, b) {
         return b.size - b.size;
      });
      
      // initially append size class to body
      _window.addEventListener('resize', _checkSize);
      
      _checkSize();
   };
};
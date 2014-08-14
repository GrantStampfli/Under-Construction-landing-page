'use strict';

var _DATE = 'September 1, 2014 09:01:14';
var _BACKGROUND = 'rgba(0, 0, 0, 0.25)';
var _FOREGROUND = 'rgba(255, 255, 255, 0.75)';
var _CAPTION = true;

(function ($) {
  $.fn.spinload = function (opts) {
    var element = this;
    var spinner = new Spinner({
      'lines': 10,
      'length': 10,
      'width': 5,
      'radius': 20,
      'corners': 1,
      'rotate': 0,
      'direction': 1,
      'color': '#FFFFFF',
      'speed': 1,
      'trail': 50,
      'shadow': false,
      'hwaccel': false,
      'className': 'spinner',
      'zIndex': 0,
      'top': 'auto',
      'left': 'auto'
    }).spin($(element).find(".spinload").get(0));
    
    $(window).bind("load", function (event) {
      setTimeout(function () {
        $(element).find(".spinload").remove();
      }, 1000);
    });
    return (this);
  };
})(jQuery);

(function ($) {
  $.fn.placeholder = function (opts) {
    var element = this;

    $(window).bind('load', function (event) {
      $('[placeholder]').each(function (index) {
        var selection = this;
        
        $(selection).val($(selection).val() === "" ? $(selection).attr('placeholder') : $(selection).val());
      });
      $('[placeholder]').bind('focus', function (event) {
        var selection = this;
        
        $(selection).val($(selection).val() === $(selection).attr('placeholder') ? "" : $(selection).val());
      });
      $('[placeholder]').bind('blur', function (event) {
        var selection = this;
        
        $(selection).val($(selection).val() === "" ? $(selection).attr('placeholder') : $(selection).val());
      });
    });
    return (this);
  };
})(jQuery);

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
    }).spin($(element).find('.spinload').get(0));
    
    $(window).bind('load', function (event) {
      setTimeout(function () {
        $(element).find('.spinload').remove();
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
        
        $(selection).val($(selection).val() === '' ? $(selection).attr('placeholder') : $(selection).val());
      });
      $('[placeholder]').bind('focus', function (event) {
        var selection = this;
        
        $(selection).val($(selection).val() === $(selection).attr('placeholder') ? '' : $(selection).val());
      });
      $('[placeholder]').bind('blur', function (event) {
        var selection = this;
        
        $(selection).val($(selection).val() === '' ? $(selection).attr('placeholder') : $(selection).val());
      });
    });
    return (this);
  };
})(jQuery);

(function ($) {
  $.fn.substitute = function (html) {
    var element = this;
    var status = false;
    
    $(element).find('.button').bind('click', function (event) {
      if ($(element).find('.data').find('.field').size() !== 0) {
        $(element).find('.data').find('.field').each(function (index) {
          var selection = this;
        
          $(selection).attr('class', $(selection).val() === $(selection).attr('placeholder') ? 'field error' : 'field');
        });
      }
      if ($(element).find('.data').find('.error').size() === 0) {
        if (status === false) {
          status = true;
          if (html) {
            $.ajax({
              'url': $(element).find('.data').attr('action'),
              'type': $(element).find('.data').attr('method'),
              'data': $(element).find('.data').serialize(),
              'success': function (data) {                
                if ($(html).size() !== 0) {
                  $(element).find('.button').replaceWith(html);
                  status = false;
                }
              }
            });
          }
          else {
            $(element).find('.data').submit();
          }
        }
      }
      return (false);
    });
    return (this);
  };
})(jQuery);

(function ($) {
  $.fn.engine = function (opts) {
    var element = this;
    var id = 0;
    var ratio = Math.round(window.devicePixelRatio ? window.devicePixelRatio : 1);
    var diff = (new Date(_DATE).getTime() - new Date().getTime()) / 1000;
    var d = Math.floor(diff / 86400);
    var h = Math.floor(diff % 86400 / 3600);
    var m = Math.floor(diff % 86400 % 3600 / 60);
    var s = Math.floor(diff % 86400 % 3600 % 60 / 1);
    var cvs = $(element).find('.clock').get(0);
    var ctx = cvs.getContext('2d');
    var fn = function () {
      cvs.width = $(element).width() * ratio;
      cvs.height = $(element).height() * ratio;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      $([
        {
          'caption': ('00' + s).slice(-2) + ' ' + (s >= 2 ? 'SECONDS' : 'SECOND'),
          'percent': (1 / 60) * s
        }, {
          'caption': ('00' + m).slice(-2) + ' ' + (m >= 2 ? 'MINUTES' : 'MINUTE'),
          'percent': (1 / 60) * m
        }, {
          'caption': ('00' + h).slice(-2) + ' ' + (h >= 2 ? 'HOURS' : 'HOUR'),
          'percent': (1 / 24) * h
        }, {
          'caption': ('00' + d).slice(-3) + ' ' + (d >= 2 ? 'DAYS' : 'DAY'),
          'percent': (1 / 365) * d
        }
      ]).each(function (index) {
        var obj = this;
        var size = cvs.width <= cvs.height ? cvs.width / 2 / 4 : cvs.height / 2 / 4;
      
        ctx.beginPath();
        ctx.font = (size) + 'px Code, Helvetica, Arial';
        ctx.textAlign = 'right';
        ctx.fillStyle = _BACKGROUND;
        ctx.fillText((_CAPTION ? obj.caption : new String()), (cvs.width) - (0.05 * cvs.width), (cvs.height) - (size * index) - (0.05 * cvs.width));
        ctx.closePath();
        ctx.beginPath();
        ctx.font = (size) + 'px Code, Helvetica, Arial';
        ctx.textAlign = 'right';
        ctx.fillStyle = _FOREGROUND;
        ctx.fillText((_CAPTION ? obj.caption : new String()), (cvs.width) - (0.05 * cvs.width + size / 2 / 10), (cvs.height) - (size * index) - (0.05 * cvs.width + size / 2 / 10));
        ctx.closePath();
      });
      if (--s < 0 && (s = s + 60)) {
        if (--m < 0 && (m = m + 60)) {
          if (--h < 0 && (h = h + 24)) {
            if (--d < 0 && (d = d + 365)) {
              clearInterval(id);
            }
          } 
        }
      }
    };

    fn();
    id = setInterval(function () {fn();}, 1000);
    return (this);
  };
})(jQuery);

(function ($) {
  $.fn.anim = function (opts) {
    var element = this;
    var delay = 5000;
    var current = 0;
    var fn = function () {
      $(element).find('.slide').each(function (index) {
        var selection = this;
        
        $(selection).css({'z-index': (index === current ? 1000 : 0), 'opacity': (index === current ? 0.5 : 0)});
      });
      current = current + 1;
      current = current === $(element).find('.slide').size() ? 0 : current;
    };

    $(window).bind('load', function (event) {
      fn();
      setInterval(function () {fn();}, delay);
    });
    return (this);
  };
})(jQuery);

(function ($) {
  $.fn.interact = function (opts) {
    var element = this;
    var status = false;
    var delay = 1000;
    var count = 0;
    
    $(element).find('.menu').bind('click', function (event) {
      status = status ? false : true;
      $('.interface').attr('class', 'interface slow').css({'margin': (status ? '60px 0 0 0' : '60px 0 0 -100%'), 'opacity': (status ? 1 : 0)});
      return (false);
    });
    $(window).bind('load', function () {
      $('.interface').css({'margin': (status ? '60px 0 0 0' : '60px 0 0 -100%'), 'opacity': (status ? 1 : 0)});
    });
    setInterval(function () {
      $(element).find('.menu').css({'opacity': ((count = count ? 0 : 1) ? 0 : 1)});
    }, delay / 2);
    return (this);
  };
})(jQuery);

(function ($) {
  $.fn.effect = function (opts) {
    var element = this;

    $(element).children().each(function (index) {
      var selection = this;
      var opacity = Math.round((1 / $(selection).offset().top) * ($(window).height() / 2 + $(window).scrollTop()) * 100) / 100;
      
      $(selection).find('.effect').css({'opacity': opacity >= 1 ? 1 : 0});
    });
    return (this);
  };
})(jQuery);

$(function () {
  $(document).spinload();
  $(document).placeholder();
  $(window).bind('load resize scroll', function (event) {
    $('.interface').effect();
  });
});
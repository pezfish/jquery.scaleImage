/**
* jQuery Scale Image
* Copyright (c) 2011 Kevin Doyle
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
**/

(function($){
	var config = { };
	var el, imgheight, imgwidth, imgratio, centerx, centery, windowheight, windowwidth, windowratio, throttle;
	var methods = {
		init : function(settings) {
			if (settings) { $.extend(config, settings); }
			return this.each(function(){
				el = $(this);
				$(window).bind("resize", function(){
					if(throttle){
						return;	
					} else {
						throttle = true;
						window.setTimeout(function() {
							methods._scaleImage();
							throttle = false;
						}, 200);
					} 
				});
				methods._redraw();
			});
		},
		calcNewImg : function() {
			return this.each(function(){
				el = $(this);
				methods._redraw();			
			});
		},
		_redraw : function(){
			setTimeout(
				function(){
					methods._calcImgRatio();
					$(window).trigger("resize");
					setTimeout(
						function(){
							el.show();
					}, 200);
			}, 50);
		},
		_calcImgRatio : function() {
			imgheight = el.height();
			imgwidth = el.width();
			imgratio = imgheight / imgwidth;
		},
		_scaleImage : function() {
			centerx = (windowwidth - imgwidth) / 2;
			centery = (windowheight - imgwidth) / 2;
			windowheight = $(window).height();
			windowwidth = $(window).width();
			windowratio = windowheight / windowwidth;

			if (windowratio > imgratio) {
				el.css({"height":windowheight, "width":(windowheight / imgratio)});
			} else {
				el.css({"height":(windowwidth * imgratio), "width":windowwidth});
			}
		}
	};
	
	$.fn.scaleImage = function(method) {
		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' +  method + ' does not exist on scaleImage' );
		}    
	};
})(jQuery);

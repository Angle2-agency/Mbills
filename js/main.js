var myScroll;
var player;
var wheel = 0;
//var rellax = new Rellax('.rellax');



/* ==========================================================================
                           Initializing animation 
   ========================================================================== */

var app = {
	stage : 1,
	freeScroll : false,
	f2 : 0,
	identifier : false,
	stages : {},
	touch : {
		start : 0,
		move : 0
	},
	init : function(){
		app.play[0]();
		app.f2 = $('.frame-3').offset().top;
	},
	getF2Y : function(){
		var y;		
		y = ($('.frame-2').offset().top - ($(window).height() - $('.frame-2').height()) / 2);			
		return y;	
	},
	getWidthTitle : function(){
		var w;
		if($(window).width() > 800){
			w = 536;
		}else{
			w = 295;
		}
		return w;
	},
	getWidthDescr : function(){
		var w;
		if($(window).width() > 800){
			w = 536;
		}else{
			w = 335;
		}
		return w;
	},
	getWidthBg : function(){
		var w;
		if($(window).width() > 800){
			w = 1136;
		}else{
			w = 335;
		}
		return w;
	},
	getWidthPhone : function(){
		var w;
		if($(window).width() > 800){
			w = 321;
		}else{
			w = 140;
		}
		return w;
	},
	goToStage : function(dir){		
        if(!app.identifier)return false;
        app.identifier = false;
		if(dir == 'down'){				
			if(app.stage < 9){
				app.stage++;
				app.prevStage = app.stage - 1;
				app.play[app.stage]();			
			}else{
				return false;
			}			
		}else if(dir == 'up'){
			if(app.stage > 1){
				app.stage--;
				app.prevStage = app.stage + 1;
				app.play[app.stage]();
			}else{
				app.identifier = true;
				wheel = 0;
				return false;
			}			
		}		
	},
	play : {
		0 : function(){
			$('html, body').scrollTop(0);			
			$('#wrapper, .frame-1').css('opacity', 1);
			$('.frame-2__title ul li[data-frame="1"], .frame-2__description ul li[data-frame="1"], .frame-2__bg ul li[data-frame="1"]').show();		
			if($('.frame-1__news').length){
				var top = $(window).height() - $('.frame-1__news').outerHeight() - 80;
				$('.frame-1__news').css('top', top);
			}
			TweenMax.set(['.frame-1 h1', '.frame-1__description', '.frame-1__stores', '.frame-1__play-but', '.frame-1__phone'], {opacity:0});
			TweenMax.set('.header__logo', {y : (($(window).height() / 2) - 35)});
			TweenMax.fromTo('.header__logo', 2, {opacity:0, scale:0.85}, {opacity:1, scale:1});
			TweenMax.to('.header__logo', 0.7, {y:0, ease: Power2.easeInOut, delay:1.6});
			TweenMax.fromTo('.frame-1', 3, {opacity:0}, {opacity:1, delay:1});		
			TweenMax.staggerFromTo(
				['.frame-1 h1', '.frame-1__description', '.frame-1__stores', '.frame-1__phone, .frame-1__play-but'],
				0.6,
				{
					y : 50,
					opacity : 0
				},
				{
					y : 0,
					opacity : 1,
					ease: Power2.easeInOut,
					delay : 2.1
				},
				0.1
			 );
			TweenMax.fromTo('.nav__button', 0.27, {opacity:0, x:-50}, {opacity:1, x:0, delay:2.8, onComplete : function(){							
				$('.frame-2, .frame-3, .frame-4, .frame-5, .frame-6, .nav-bottom, footer').css('opacity', 1);
				app.identifier = true;
				wheel = 0;
			}});
		},
		1 : function(){			
			TweenMax.to('#wrapper', 0.6, {ease: Power2.easeInOut, y:0, onComplete : function(){			
				app.identifier = true;
				wheel = 0;
			}});
			TweenMax.fromTo('.header__logo', 0.3, {y:-200}, {y:0, ease: Power2.easeInOut, delay:0.3});
			TweenMax.staggerFromTo(
				['.frame-1__phone', '.frame-1__play-but' , '.frame-1__stores', '.frame-1__description', '.frame-1 h1'],
				0.3,
				{
					y : -500,
					opacity : 0
				},
				{
					y : 0,
					opacity : 1,
					ease: Power2.easeInOut,
					delay : 0.2
				},
				0.05
			 );
		},
		2 : function(){
			TweenMax.to('.header__logo', 0.3, {y:-200, ease: Power2.easeInOut});			
			TweenMax.staggerFromTo(
				['.frame-1 h1', '.frame-1__description', '.frame-1__stores', '.frame-1__phone, .frame-1__play-but'],
				0.3,
				{
					y : 0,
					opacity : 1
				},
				{
					y : -500,
					opacity : 0,
					ease: Power2.easeInOut,
					delay : 0.2
				},
				0.05
			 );			
			if(app.prevStage == 1){
				$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
				$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
				$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();
				$('.frame-1__news').fadeOut(150);
				TweenMax.fromTo('#wrapper', 0.6, {y:0},{ease: Power2.easeInOut, y:-app.getF2Y(), delay : 0.35, onComplete : function(){
					app.identifier = true;
					wheel = 0;
				}});	
			}else if(app.prevStage == 3){
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
					$('.frame-2__title ul li').hide();
					$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}});
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
					$('.frame-2__description ul li').hide();
					$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
					TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
				}});
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){								
					$('.frame-2__bg ul li').hide();
					$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();					
					TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
						app.identifier = true;
						wheel = 0;
				}});
				TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:0, delay : 0.8, onComplete : function(){
					app.identifier = true;
					wheel = 0;
				}});
			}						
		},
		3 : function(){
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				$('.frame-2__title ul li').hide();
				$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				$('.frame-2__description ul li').hide();
				$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
			}});			
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){								
				$('.frame-2__bg ul li').hide();
				$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();
				
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(app.getWidthPhone()), delay : 0.8, onComplete : function(){
				
			}});			
		},	
		4 : function(){			
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				$('.frame-2__title ul li').hide();
				$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				$('.frame-2__description ul li').hide();
				$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){								
				$('.frame-2__bg ul li').hide();
				$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();
				
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(app.getWidthPhone()*2), delay : 0.8, onComplete : function(){
				
			}});
		},
		5 : function(){			
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				$('.frame-2__title ul li').hide();
				$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				$('.frame-2__description ul li').hide();
				$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){								
				$('.frame-2__bg ul li').hide();
				$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();
				
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(app.getWidthPhone()*3), delay : 0.8, onComplete : function(){
				
			}});
		},
		6 : function(){			
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				$('.frame-2__title ul li').hide();
				$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				$('.frame-2__description ul li').hide();
				$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){								
				$('.frame-2__bg ul li').hide();
				$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();
				
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(app.getWidthPhone()*4), delay : 0.8, onComplete : function(){
				
			}});
		},
		7 : function(){
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				$('.frame-2__title ul li').hide();
				$('.frame-2__title ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				$('.frame-2__description ul li').hide();
				$('.frame-2__description ul li[data-frame='+(app.stage-1)+']').show();
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){								
				$('.frame-2__bg ul li').hide();
				$('.frame-2__bg ul li[data-frame='+(app.stage-1)+']').show();
				
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(app.getWidthPhone()*5), delay : 0.8, onComplete : function(){
				
			}});
		},
		8 : function(){
			var sY;
			if($(window).width() > 800){
				//sY = app.f2
				sY = $('.frame-3').offset().top - $('#wrapper').offset().top - 100;
			}else{
				sY = $('.frame-3').offset().top - $('#wrapper').offset().top - 50;
			}
			TweenMax.to('#wrapper', 0.6, {ease: Power2.easeInOut, y:-sY, onComplete : function(){
				app.freeScroll = true;
				TweenMax.fromTo('.header__logo', 0.3, {y:-200}, {y:0, ease: Power2.easeInOut, delay:0.3});
				TweenMax.staggerFromTo(
					['.frame-1__phone', '.frame-1__play-but' , '.frame-1__stores', '.frame-1__description', '.frame-1 h1'],
					0.3,
					{
						y : -500,
						opacity : 0
					},
					{
						y : 0,
						opacity : 1,
						ease: Power2.easeInOut,
						delay : 0.2
					},
					0.05
				 );				
				$('html, body').css({
					overflowY : 'auto',
					overflowX : 'hidden',
					height : 'initial'
				});
				$(document).scrollTop(sY);
				$('#wrapper').css({
					'transform' : 'translate3d(0, 0, 0)',
					'marginRight' : '-17px'
				});
				TweenMax.to('.frame-2__phone_slider ul', 0, {x:0});
				$('.frame-2__title ul li, .frame-2__description ul li, .frame-2__bg ul li').hide();
				$('.frame-2__title ul li[data-frame="1"], .frame-2__description ul li[data-frame="1"], .frame-2__bg ul li[data-frame="1"]').show();
				$(document).scroll(function(e){
					var tn = $('.frame-3').offset().top - 250;
					if($(document).scrollTop() >= tn){
						$('.top__download').addClass('show');
						$('.nav__top').css('transform' , 'translate3d(0, 0, 0)');
					}else{
						$('.top__download').removeClass('show');
						$('.nav__top').css('transform' , 'translate3d(0, -100%, 0)');
					}					
					if($(document).scrollTop() == 0){
						app.stage = 1;
						app.identifier = true;
						app.freeScroll = false;
						$.fn.fullpage.moveTo(1);
						$('html, body').css({
							overflowY : 'hidden',
							overflowX : 'hidden',
							height : '100%'
						});												
						$(document).unbind('scroll');
					}
				});				
			}});			
		}
	},	
};


$('.nav__left').click(function(e) {
	if(!$(e.target).closest('aside.show-nav').length)$('#nav-button').click();	
});
$('.modal').click(function(e){
	if(!$(e.target).closest('modal__wrapper').length){
		player.destroy();
		$(this).fadeOut(350);
	}
})


$('#nav-button').click(function(){	
	if($('.nav__left').is(':hidden')){
		app.identifier = false;
		$('.nav__left').fadeIn(300, function(){			
			$('.nav__left aside').addClass('show-nav');			
		});
		$('.nav__butto_icon').addClass('show-nav');		
	}else{						
		$(this).mouseleave()
		if(!app.freeScroll)app.identifier = true;	
		$('.nav__left aside').removeClass('show-nav');
		$('.nav__butto_icon').removeClass('show-nav');
		setTimeout(function(){
			$('.nav__left').fadeOut(300);	
		}, 200);
		
	}
	$('body').toggleClass('show-nav');
});

$('#play-video-1, #play-video-2').click(function(e){	
	var id = document.querySelector('#modal-1 .modal__wrapper');
	var w, h;
	if($(window).width() > 800){
		w = 854;
		h = 480;
	}else{
		w = $(window).width() - 60;
		h = w / 1.77;
	}	
	function onYouTubeIframeAPIReady() {
		player = new YT.Player(id, {
			height: h,
			width: w,
			playerVars: {
				'autoplay': 1
			},
			videoId: 'PPLgXcxMEQc',
			events: {
				'onReady': function(){
					$('#modal-1').fadeIn(350);
				}				
			}
		});
	}
	onYouTubeIframeAPIReady();	
});

$('.frame-1__news .frame-1__news_close').click(function(e) {
	$('.frame-1__news').fadeOut(150);
});
$('.frame-4__comment .frame-4__news_close').click(function(e) {	
	$(e.target).closest('.frame-4__comment_tooltip').fadeOut(150);
});

$('.frame-4__comment').mouseenter(function(e){
	if($(window).width() > 800){
		var x = $(e.currentTarget).offset().left + $(e.currentTarget).width() + 25 + 529;	
		if(($(document).width() - x) > 0){
			$(e.currentTarget).find('.frame-4__comment_tooltip').css({
				left : '100%',
				paddingLeft : '25px'
			}).fadeIn(150);				
		}else{
			$(e.currentTarget).find('.frame-4__comment_tooltip').css({
				right : '100%',
				paddingRight : '25px'
			}).fadeIn(150);		
		}		
	}else{		
		var y = $(this).offset().top - 90;
		$(e.currentTarget).find('.frame-4__comment_tooltip').css({
			top : y,
			left : 0
		}).fadeIn(150);	
	}
	
});
$('.frame-4__comment').mouseleave(function(e){
	$(e.currentTarget).find('.frame-4__comment_tooltip').removeAttr('style').fadeOut(150);
});

$(document).on('touchstart', function(e){
	app.touch.start = e.changedTouches[0].pageY;	
});
$(document).on('touchmove', function(e){
	var diff, direction;
	app.touch.move = e.changedTouches[0].pageY;
	diff = app.touch.start - app.touch.move;
	direction = diff > 0 ? 'down' : 'up';
	if(diff > 30 || diff < -30){
		if(app.identifier)app.goToStage(direction);			
	}	
});
$(window).resize(function(e){

});
$(document).ready(function() {
	setTimeout(function(){
		$(document).scrollTop(0);
	}, 200);
	app.init();	
	$('#fullpage').fullpage({
		scrollingSpeed : 250,
		onLeave: function(index, nextIndex, direction){						
			if(!app.identifier)return false;
			app.goToStage(direction);			
		}
	});
});


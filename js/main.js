var myScroll;
var player;
//var rellax = new Rellax('.rellax');
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
		$('.nav__left').fadeIn(300, function(){
			console.log($('.nav__left aside').height());
			if($('.nav__left aside').height() < 900){
				$('.nav__left_footer').addClass('na');
				$(".nav__left aside").nanoScroller();				
			}else{
				$('.nav__left_footer').removeClass('na');
			}
			$('.nav__left aside').addClass('show-nav');			
		});
		$('.nav__butto_icon').addClass('show-nav');		
	}else{
		$('.nav__left aside').removeClass('show-nav');
		$('.nav__butto_icon').removeClass('show-nav');
		setTimeout(function(){
			$('.nav__left').fadeOut(300);	
		}, 200);
		
	}
	$('body').toggleClass('show-nav');
});

$('#play-video-1, #play-video-2').click(function(e){
	console.log(e);	
	var id = document.querySelector('#modal-1 .modal__wrapper');
	function onYouTubeIframeAPIReady() {
		player = new YT.Player(id, {
			height: '480',
			width: '854',
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

$('.frame-4__comment').mouseenter(function(e){
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
});
$('.frame-4__comment').mouseleave(function(e){
	$(e.currentTarget).find('.frame-4__comment_tooltip').removeAttr('style').fadeOut(150);
});






/* ==========================================================================
                           Initializing animation 
   ========================================================================== */

var app = {
	stage : 1,
	prevStage : 1,
	identifier : false,
	stages : {},
	init : function(){
		app.play[0]();
		app.getCoord();
	},
	getCoord : function(){
		stages = {			
			'f1' : 0,
			'f2' : $('.frame-2').offset().top - ($(window).height() - $('.frame-2').height()) / 2,
			'f3' : $('.frame-3').offset().top - ($(window).height() - $('.frame-3').height()) / 2,
			'f4' : $('.frame-4').offset().top - ($(window).height() - $('.frame-4').height()) / 2,
			'f5' : $('.frame-5').offset().top - ($(window).height() - $('.frame-5').height()) / 2,
			'f6' : $('#wrapper').height() - $(window).height()
		}
	},
	goToStage : function(delta){		
		if(!app.identifier)return false;
		console.log(app.stage, delta);
		if(delta == -1){
			if(app.stage < 8){
				app.stage++;
				app.play[app.stage]();			
			}else{
				return false;
			}			
		}else if(delta == 1){
			if(app.stage > 1){
				app.stage--			
				app.play[app.stage]();
			}else{
				return false;
			}			
		}		
		//eval(stage);		
	},
	play : {
		0 : function(){
			app.identifier = false;		
			$('#wrapper, .frame-1').css('opacity', 1);		
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
			}});
		},
		1 : function(){
			app.identifier = false;
			TweenMax.to('#wrapper', 0.6, {ease: Power2.easeInOut, y:0, onComplete : function(){			
				app.identifier = true;			
			}});
		},
		2 : function(){
			console.log(app.stage);
			app.identifier = false;	
			TweenMax.to('#wrapper', 0.6, {ease: Power2.easeInOut, y:-stages.f2, onComplete : function(){			
				
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:0});
				TweenMax.staggerTo(
					['.frame-2__title ul', '.frame-2__description ul'],
					0.5,			
					{
						x : 0,				
						ease: Power2.easeInOut,
						delay : 0.15
					},
					0.05
				 );
				TweenMax.to('.frame-2__bg ul', 0.4, {ease: Power2.easeInOut, x:0, delay : 0.3, onComplete : function(){app.identifier = true;}});			
		},
		3 : function(){
			app.identifier = false;	
			TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:-321});
			TweenMax.staggerTo(
				['.frame-2__title ul', '.frame-2__description ul'],
				0.5,			
				{
					x : -536,				
					ease: Power2.easeInOut,
					delay : 0.15
				},
				0.05
			 );
			TweenMax.to('.frame-2__bg ul', 0.4, {ease: Power2.easeInOut, x:-1136, delay : 0.3, onComplete : function(){app.identifier = true;}});
		},	
		4 : function(){
			app.identifier = false;	
			TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:(-321 * 2)});
			TweenMax.staggerTo(
				['.frame-2__title ul', '.frame-2__description ul'],
				0.5,			
				{
					x : (-536*2),
					ease: Power2.easeInOut,
					delay : 0.15
				},
				0.05
			 );
			TweenMax.to('.frame-2__bg ul', 0.4, {ease: Power2.easeInOut, x:(-1136 * 2), delay : 0.3, onComplete : function(){app.identifier = true;}});
		},
		5 : function(){
			app.identifier = false;	
			TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:(-321 * 3)});
			TweenMax.staggerTo(
				['.frame-2__title ul', '.frame-2__description ul'],
				0.5,			
				{
					x : (-536*3),
					ease: Power2.easeInOut,
					delay : 0.15
				},
				0.05
			 );
			TweenMax.to('.frame-2__bg ul', 0.4, {ease: Power2.easeInOut, x:(-1136 * 3), delay : 0.3, onComplete : function(){app.identifier = true;}});
		},
		6 : function(){
			app.identifier = false;	
			TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:(-321 * 4)});
			TweenMax.staggerTo(
				['.frame-2__title ul', '.frame-2__description ul'],
				0.5,			
				{
					x : (-536*4),
					ease: Power2.easeInOut,
					delay : 0.15
				},
				0.05
			 );
			TweenMax.to('.frame-2__bg ul', 0.4, {ease: Power2.easeInOut, x:(-1136 * 4), delay : 0.3, onComplete : function(){app.identifier = true;}});
		},
		7 : function(){
			app.identifier = false;	
			TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:(-321 * 5)});
			TweenMax.staggerTo(
				['.frame-2__title ul', '.frame-2__description ul'],
				0.5,			
				{
					x : (-536*5),
					ease: Power2.easeInOut,
					delay : 0.15
				},
				0.05
			 );
			TweenMax.to('.frame-2__bg ul', 0.4, {ease: Power2.easeInOut, x:(-1136 * 5), delay : 0.3, onComplete : function(){
				$('html, body').css({
					overflowY : 'auto',
					overflowX : 'hidden'
				});
				$(document).scrollTop(stages.f2);
				$('#wrapper').css('transform','translate3d(0, 0, 0)');
				$(document).scroll(function(e){
					var tn = $('.frame-3').offset().top - 244;
					if($(document).scrollTop() > tn){
						$('.nav__top').css('transform' , 'translate3d(0, 0, 0)');
					}else{
						$('.nav__top').css('transform' , 'translate3d(0, -100%, 0)');
					}
				});
			}});
		},
	},	
};
$('body').mousewheel(function(event) {		
		app.goToStage(event.deltaY);    
});

/*
$('body').mousewheel(function(event) {		
	if(!app.identifier)return;
	app.identifier = false;
	if(event.deltaY == -1){
		if(app.stage < 8){			
			app.stage++;
			app.goToStage('app.s_'+app.stage+'();');
		}else{
			return;
		}
	}else if(event.deltaY == 1){
		if(app.stage > 1){
			app.stage--;
			app.goToStage('app.s_'+app.stage+'();');
		}else{
			app.identifier = true;
			return;
		}
	}
    
});
*/
$(document).ready(function() {
		setTimeout(function(){
			$(document).scrollTop(0);
		}, 200);		
		app.init();	
});


var myScroll;
var player;
var wheel = 0;
//var rellax = new Rellax('.rellax');



/* ==========================================================================
                           Initializing animation 
   ========================================================================== */

var app = {
	stage : 1,
	prevStage : 0,
	f2 : 0,
	identifier : false,
	stages : {},
	init : function(){
		app.play[0]();
		app.f2 = ($('.frame-2').offset().top - ($(window).height() - $('.frame-2').height()) / 2);
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


		/*
		if( scrollAllowed ) {	        
	        if(!app.identifier)return false;			
			if(event.deltaY < 0){				
				if(app.stage < 8){
					app.stage++;
					app.play[app.stage]();			
				}else{
					return false;
				}			
			}else if(event.deltaY > 0){
				if(app.stage > 1){
					app.stage--			
					app.play[app.stage]();
				}else{
					return false;
				}			
			}		
	    }



		if(!app.identifier)return false;
		console.log('deltaFactor: '+event.deltaFactor);
		console.log('deltaY: '+event.deltaY);		
		if(delta == -1){
			console.log('stage: '+app.stage);
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
		*/
	},
	play : {
		0 : function(){
			$('html, body').scrollTop(0);			
			$('#wrapper, .frame-1').css('opacity', 1);		
			if($('.frame-1__news').length){
				var top = $(window).height() - $('.frame-1__news').outerHeight() - 40;
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
				TweenMax.fromTo('#wrapper', 0.6, {y:0},{ease: Power2.easeInOut, y:-app.f2, delay : 0.35, onComplete : function(){
					app.identifier = true;
					wheel = 0;
				}});	
			}else if(app.prevStage == 3){
				TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				TweenMax.to('.frame-2__title ul', 0, {x : 0, onComplete : function(){
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}})	
				}});
				TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
					TweenMax.to('.frame-2__description ul', 0, {x : 0, onComplete : function(){
						TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
					}})	
				}});
				TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){				
					TweenMax.to('.frame-2__bg ul', 0, {x : 0, onComplete : function(){
						TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					}})	
				}});
				TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:0, delay : 0.8, onComplete : function(){
					app.identifier = true;
					wheel = 0;
				}});
			}						
		},
		3 : function(){
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				TweenMax.to('.frame-2__title ul', 0, {x : -536, onComplete : function(){
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				TweenMax.to('.frame-2__description ul', 0, {x : -536, onComplete : function(){
					TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){				
				TweenMax.to('.frame-2__bg ul', 0, {x : -1136, onComplete : function(){
					TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
				}})	
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-321, delay : 0.8, onComplete : function(){
				
			}});



			/*
				TweenMax.staggerTo(
					['.frame-2__title ul', '.frame-2__description ul', '.frame-2__bg ul', '.frame-2__phone_slider ul'],
					0.15,			
					{
						opacity : 0,
					},
					0.12
				 );

				TweenMax.to('.frame-2__phone_slider ul', 0, {ease: Power2.easeInOut, x:-321, delay : 0.6});
				TweenMax.staggerTo(
					['.frame-2__title ul', '.frame-2__description ul'],
					0.0,			
					{
						x : -536,				
						ease: Power2.easeInOut,
						delay : 0.2
					},
					0.05
				 );
				TweenMax.to('.frame-2__bg ul', 0, {ease: Power2.easeInOut, x:-1136, delay : 0.6});
				TweenMax.staggerTo(
					['.frame-2__title ul', '.frame-2__description ul', '.frame-2__phone_slider ul', '.frame-2__bg ul'],
					0.15,			
					{
						opacity : 1,
						delay : 0.8						
					},
					0.12
				 );
				 */
		},	
		4 : function(){			
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				TweenMax.to('.frame-2__title ul', 0, {x : (-536*2), onComplete : function(){
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				TweenMax.to('.frame-2__description ul', 0, {x : (-536*2), onComplete : function(){
					TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){				
				TweenMax.to('.frame-2__bg ul', 0, {x : (-1136 * 2), onComplete : function(){
					TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
				}})	
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(321*2), delay : 0.8, onComplete : function(){
				
			}});
		},
		5 : function(){			
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				TweenMax.to('.frame-2__title ul', 0, {x : (-536*3), onComplete : function(){
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				TweenMax.to('.frame-2__description ul', 0, {x : (-536*3), onComplete : function(){
					TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){				
				TweenMax.to('.frame-2__bg ul', 0, {x : (-1136 * 3), onComplete : function(){
					TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
				}})	
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(321*3), delay : 0.8, onComplete : function(){
				
			}});
		},
		6 : function(){			
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				TweenMax.to('.frame-2__title ul', 0, {x : (-536*4), onComplete : function(){
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				TweenMax.to('.frame-2__description ul', 0, {x : (-536*4), onComplete : function(){
					TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){				
				TweenMax.to('.frame-2__bg ul', 0, {x : (-1136 * 4), onComplete : function(){
					TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
				}})	
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(321*4), delay : 0.8, onComplete : function(){
				
			}});
		},
		7 : function(){
			TweenMax.to('.frame-2__title ul', 0.5, {opacity : 0, onComplete : function(){
				TweenMax.to('.frame-2__title ul', 0, {x : (-536*5), onComplete : function(){
					TweenMax.to('.frame-2__title ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__description ul', 0.5, {opacity : 0, delay : 0.15, onComplete : function(){				
				TweenMax.to('.frame-2__description ul', 0, {x : (-536*5), onComplete : function(){
					TweenMax.to('.frame-2__description ul', 0.5, {opacity : 1});
				}})	
			}});
			TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 0, delay : 0.3, onComplete : function(){				
				TweenMax.to('.frame-2__bg ul', 0, {x : (-1136 * 5), onComplete : function(){
					TweenMax.to('.frame-2__bg ul', 0.5, {opacity : 1});
					app.identifier = true;
					wheel = 0;
				}})	
			}});
			TweenMax.to('.frame-2__phone_slider ul', 0.4, {ease: Power2.easeInOut, x:-(321*5), delay : 0.8, onComplete : function(){
				
			}});
		},
		8 : function(){
			TweenMax.to('#wrapper', 0.6, {ease: Power2.easeInOut, y:-(app.f2*2), onComplete : function(){
				//$.fn.fullpage.destroy();
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
				TweenMax.to(['.frame-2__title ul', '.frame-2__description ul', '.frame-2__phone_slider ul', '.frame-2__bg ul'], 0, {x:0});
				$('html, body').css({
					overflowY : 'auto',
					overflowX : 'hidden',
					height : 'initial'
				});
				$(document).scrollTop(app.f2 * 2);
				$('#wrapper').css({
					'transform' : 'translate3d(0, 0, 0)',
					'marginRight' : '-17px'
				});				
				$(document).scroll(function(e){
					var tn = $('.frame-3').offset().top - 250;
					if($(document).scrollTop() >= tn){
						$('.nav__top').css('transform' , 'translate3d(0, 0, 0)');
					}else{
						$('.nav__top').css('transform' , 'translate3d(0, -100%, 0)');
					}
					if($(document).scrollTop() == 0){
						app.stage = 1;
						app.identifier = true;
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
		app.identifier = true;
		wheel = 0;
		app.identifier = true;
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




/*
$('body').mousewheel(function(event){
	newDate = new Date();
    var scrollAllowed = true;	    
    if( wheel < 10 && (newDate.getTime()-oldDate.getTime()) < 100 ) {
        wheel++;
        scrollAllowed = false;
        oldDate = new Date();
        event.preventDefault();
		return false;
    } else {
        if( (newDate.getTime()-oldDate.getTime()) > 100 ) {
            wheel = 0;
            oldDate = new Date();
        }
        else {
        	scrollAllowed = false;
        	oldDate = new Date();
            event.preventDefault();
			return false;
        }
    }
    oldDate = new Date();    
    console.log(scrollAllowed);
    if(scrollAllowed) {		    
    	app.goToStage(event);
    }	
});


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
	$('#fullpage').fullpage({
		scrollingSpeed : 250,
		onLeave: function(index, nextIndex, direction){						
			if(!app.identifier)return false;				
			app.goToStage(direction);
			console.log(index, nextIndex, direction);
		}
	});
});


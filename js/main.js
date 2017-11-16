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
var stage = 1;
var identifier = true;
var stages;
var animation = {
	stages : {},
	identifier : true,
	init : function(){
		animation.getCoord();
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
	goToStage : function(stage){		
		eval(stage);
		console.log(stage);
	},
	s_1 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f1, onComplete : function(){			
			animation.identifier = true;
		}});
	},
	s_2 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f2, onComplete : function(){			
			animation.identifier = true;
		}});
		TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:0, onComplete : function(){			
			animation.identifier = true;
		}});
	},
	s_3 : function(){
		TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:-321, onComplete : function(){			
			animation.identifier = true;
		}});
	},
	s_4 : function(){
		TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:-(321*2), onComplete : function(){			
			animation.identifier = true;
		}});
	},
	s_5 : function(){
		TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:-(321*3), onComplete : function(){			
			animation.identifier = true;
		}});
	},
	s_6 : function(){
		TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:-(321*4), onComplete : function(){			
			animation.identifier = true;
		}});
	},
	s_7 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f2, onComplete : function(){			
			animation.identifier = true;
		}});
		TweenMax.to('.frame-2__phone_slider ul', 0.5, {ease: Power2.easeInOut, x:-(321*5), onComplete : function(){			
			animation.identifier = true;
		}});
		$('.nav__top').removeClass('show');
	},
	s_8 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f3, onComplete : function(){			
			animation.identifier = true;
		}});
		$('.nav__top').addClass('show');
	},
	s_9 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f4, onComplete : function(){			
			animation.identifier = true;
		}});		
	},
	s_10 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f5, onComplete : function(){			
			animation.identifier = true;
		}});		
	},
	s_11 : function(){
		TweenMax.to('#wrapper', 1, {ease: Power2.easeInOut, y:-stages.f6, onComplete : function(){			
			animation.identifier = true;
		}});		
	},
}
$('body').mousewheel(function(event) {	
	if(!animation.identifier)return;
	if(event.deltaY == -1){
		if(stage < 11){
			stage++;
			animation.goToStage('animation.s_'+stage+'();');
			event.preventDefault();
		}else{
			return;
		}
	}
	if(event.deltaY == 1){
		if(stage > 1){
			stage--;
			animation.goToStage('animation.s_'+stage+'();');
			event.preventDefault();	
		}else{
			return;
		}
	}
	animation.identifier = false;
    console.log(event);
});
$(document).ready(function() {
	animation.init();
});


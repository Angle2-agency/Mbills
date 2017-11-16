var myScroll;
var player;
var rellax = new Rellax('.rellax');
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


$('body').mousewheel(function(event) {

    console.log(event.deltaX, event.deltaY, event.deltaFactor);	
});
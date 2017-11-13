var myScroll;
$('.nav__left').click(function(e) {
	if(!$(e.target).closest('aside.show-nav').length)$('#nav-button').click();
	console.log(s);
});


$('#nav-button').click(function(){
	if($('.nav__left').is(':hidden')){		
		$('.nav__left').fadeIn(300, function(){
			console.log($('.nav__left aside').height());
			if($('.nav__left aside').height() < 900){
				$('.nav__left_footer').addClass('na');
				myScroll = myScroll || new IScroll('.nav__left aside', {
				    mouseWheel: true,
				    scrollbars: true
				});
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
})
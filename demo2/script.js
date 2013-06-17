$(document).ready(function(){
	
	var totWidth=0;
	var positions = new Array();
	
	$('#slides .slide').each(function(i){
	
		positions[i]= totWidth;
		totWidth += $(this).width();
		
		if(!$(this).width())
		{
			alert("Please, fill in width & height for all your images!");
			return false;
		}
	});
	
	$('#slides').width(totWidth);

	/* Change the cotnainer div's width to the exact width of all the slides combined */

	$('.dot-nav ul li a').click(function(e,keepScroll){

			/* On a thumbnail click */

			$('.hero-gallery').removeClass('active');
			$(this).addClass('active');
			
			var pos = $(this).parent().prevAll('.menu-Item').length;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */		
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});
	
	$('.dot-nav ul li.menu-Item:first a').addClass('active');	
	
	/*****
	 *
	 *	Enabling auto-advance.
	 *
	 ****/
	 
	var current=1;
	function autoAdvance()
	{
		if(current==-1) return false;
		
		$('.dot-nav ul li a').eq(current%$('.dot-nav ul li a').length).trigger('click',[true]);	// [true] will be passed as the keepScroll parameter of the click function on line 28
		current++;
	}

	// The number of seconds that the slider will auto-advance in:
	
	var changeEvery = 5;

	var itvl = setInterval(function(){autoAdvance()},changeEvery*1000);
	
	$('.paddle-nav .arrow').click(function(e,keepScroll){		
		clearInterval(itvl);
		
		var currentPosition = $('#slides').css('marginLeft');
		currentPosition = Math.abs(parseInt(currentPosition.substring(0,currentPosition.length-2)));
		
		
		for( var i=0,length=positions.length;i<length;i++){
			if (positions[i] == currentPosition)
				break;
		}
		
		if( i != length ){
			if ($(this).hasClass('prev'))
				i = i - 1;
			else
				i = i + 1;
			
			$('.dot-nav ul li a').eq(i%$('.dot-nav ul li a').length).trigger('click',[true]);
		}
	});

	/* End of customizations */
});
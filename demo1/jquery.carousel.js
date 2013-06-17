$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */
	
	var totWidth=0;
	var positions = new Array();
	
	$('#slides .slide').each(function(i){
		
		/* Traverse through all the slides and store their accumulative widths in totWidth */
		
		positions[i]= totWidth;
		totWidth += $(this).width();
		
		/* The positions array contains each slide's commulutative offset from the left part of the container */
		
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
			
			/*
			$('.paddle-nav .arrow').removeClass('disabled');
			
			if ( pos == 0 ){
				$('.paddle-nav .prev').addClass('disabled');
			} else if ( pos == positions.length - 1){
				$('.paddle-nav .next').addClass('disabled');
			}
			*/
			
			$('#slides').stop();
			
			$('#slides .slide').each(function(){
				if ($(this).css('visibility') == 'visible'){
					$(this).animate({'opacity':'0'},250).queue(function(next){$(this).css({'visibility':'hidden'});next();});
				}
			});
			
			$('#slides .slide').eq(pos).css({'visibility':'visible'}).animate({'opacity':'1'},250);
			$('#slides').animate({marginLeft:-positions[pos]+'px'},250);
			
			
			
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});
	
	$('.dot-nav ul li.menu-Item:first a').addClass('active');
	/* On page load, mark the first thumbnail as active */
	//$('.paddle-nav .prev').addClass('disabled');
	
	$('#slides .slide:eq(0)').css({'visibility':'visible','opacity':'1'});
	$('#slides .slide:gt(0)').css({'visibility':'hidden','opacity':'0'});
	
	
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
		
		var currentPosition = getCurrentPosition();
	
		if( currentPosition != positions.length ){
			
			clearInterval(itvl);
		
			if ($(this).hasClass('prev'))
				currentPosition = currentPosition - 1;
			else
				currentPosition = currentPosition + 1;
			
			$('.dot-nav ul li a').eq(currentPosition%$('.dot-nav ul li a').length).trigger('click',[true]);
		}
	});
	
	function getCurrentPosition(){
		var currentPosition = $('#slides').css('marginLeft');
		currentPosition = Math.abs(parseInt(currentPosition.substring(0,currentPosition.length-2)));
		
		for( var i=0,length=positions.length;i<length;i++){
			if (positions[i] == currentPosition)
				break;
		}
		
		return i;
	}

	/* End of customizations */
});
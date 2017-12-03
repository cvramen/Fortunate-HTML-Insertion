/* This file contains the process that loads new content when the URL's hash changes, i.e. when the user clicks on something */

$(document).ready(function (){
	var running; //an on/off switch to prevent the site from attempting to load content while it is in the process of loading content
	$(window).hashchange( function(){
		if (running != true) //if the page is not already trying to load new content, go for it!
		{
			running = true; //flip the on/off switch here
			var hash = location.hash;
			if (hash == "")
			{
				hash = "#1"; //if no hash value is provied e.g. the URL is simply treated as the page's default URL with "#1" after.
			}
			var randomaddon = Math.random(); //a string of random characters is created and tacked on to the URL. This is to address cache issues. Some browsers will erroneously display old versions of content, so adding "?ver" plus random characters at the end for the browser to not use its cache.
			var newcontentname = hash + ".html?ver" + randomaddon; //based on the hash find the html file with the content the user requested
			newcontentname = newcontentname.substr(1); //just takes the pound sign out
			$("#mainrow").append("<div id='secondcell'>" + "</div>"); //secondcell is where the new content will get loaded to
			$("#secondcell").load(newcontentname + "#loadcontent");
			$("#gallery_inner").animate({margin: "0 0 0 -600px"}, 400, function() //this function makes the stuff move, (takes 400 milliseconds) and then after it's over, firstcell is removed from the DOM and secondcell's name changes to firstcell"
			{
				$("#firstcell").hide();
				$("#firstcell").remove();
				$("#gallery_inner").css({"margin" : "0 0 0 0"});
				$("#secondcell").attr("id", "firstcell");
				running = false;
				$(".boxw").css("display","none");
			});
			setTimeout(function() { //If the desired content does not appear in 1.7 seconds, default "error message" appears.
			var tellme = $('html').find('.present').length;
			if (tellme < 1) 
			{
				$("#firstcell").append("The content was not found. <a href='example.html'>Click here to return to main page.</a>");
			}	
			},1700);
		}
	})
$(window).hashchange(); //this ensures that the function occurs when the page loads, NOT JUST when the user clicks on something to change the URL hash
});
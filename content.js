
//alert(document.URL);
var oldonload = window.onload || function (){};
window.onload = function () {
	oldonload();
	
	
	document.onkeydown = function(){
		
		/* Test
		window.location.reload();
		var index = "http://comic.sfacg.com/HTML/" ;
		var name = "HunterXHunter";
		var epi = "345";
		var url = index + name +"/"+epi;
		window.location.assign(url);
		window.location.reload();
		*/
		
		if(event.keyCode ==66 || event.keyCode == 78){
			alert(event.keyCode);	
			//Press B back to previous episode
			if(event.keyCode == 66){

			//	window.location.reload(true);
				var url = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/HunterXHunter\//i);
				alert(url);
				/*var test = document.URL.match(/\/\d+\//);
				alert(test);*/
				var epi = document.URL.match(/\d+/);
				//alert(epi);
				var nextEp = parseInt(epi) - 1;
				alert(nextEp)

				var nextUrl = url[0] + nextEp +"/";
				alert(nextUrl);
				
				//window.location.assign(nextUrl);
				setTimeout(function(){window.location.href=nextUrl;},20);
			//	window.location.reload(true);
			
			//Press N forward to next episode
			}else if(event.keyCode ==78){
				
				var url = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/HunterXHunter\//i);
				var epi = document.URL.match(/\d+/);
				var nextEp = parseInt(epi) + 1;

				var nextUrl = url[0] + nextEp +"/";
				
				setTimeout(function(){window.location.href=nextUrl;},20);
			
			
			}
		}
		
		//Ctrl for next page  Shift for previous page
		if(event.keyCode == 16 || event.keyCode == 17){
			window.location.reload(true); 
			var reg = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/HunterXHunter\/\d+\/#p=/i); 

			var cut_length = reg[0].length; 
			
			
			//Parse out 
			var page = document.URL.substring(cut_length); 
			var page_int = parseInt(page); 
			
				if(event.keyCode == 16){ 
					if(page_int != 1){ 
						var temp = page_int - 1; 
						window.location.assign(reg[0]+temp); 
					} 
				} 
				else if(event.keyCode == 17){ 
					var temp = page_int + 1;
					window.location.replace(reg[0]+temp); 
				} 
					window.location.reload(true); 
		}
	};
			
		
}


//alert(document.URL);
var oldonload = window.onload || function (){};

window.onload = function () {
	oldonload();
	
	var flag = 1;
	var temp = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/\w+\/\d+\/#p=/i);
	if( temp != null){
			flag = 0;
	}


	if( flag == 1){
		var url = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/\w+\/\d+\//i);
		if( url !=null){
			var reload = url[0]+"#p=1";
			setTimeout(function(){window.location.href=reload;},5);
			
		}
	}
	
	var temp = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/\w+\/\d+j\/#p=/i);
	alert(temp);
	document.onkeydown = function(){
		


		if(event.keyCode ==66 || event.keyCode == 78){
			//Press B back to previous episode
			if(event.keyCode == 66){
				var url = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/\w+\//i);

				
				var epi = document.URL.match(/\d+/);
				alert(epi);
				var previousEp = parseInt(epi) - 1;
				
				if( previousEp < 100){
					var nextUrl = url[0] + "0" + previousEp +"/#p=1";
				}else{
					var nextUrl = url[0] + previousEp + "/#p=1";
				}
				
				setTimeout(function(){window.location.href=nextUrl;},20);
			
			//Press N forward to next episode
			}else if(event.keyCode ==78){
			
				var url = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/\w+\//i);




				var epi = document.URL.match(/\d+/);
				var nextEp = parseInt(epi) + 1;

				if( nextEp < 100){
					var nextUrl = url[0] + "0" + nextEp +"/#p=1";
				}else{
					var nextUrl = url[0] + nextEp + "/#p=1";
				}
			
				setTimeout(function(){window.location.href=nextUrl;},20);
			
		
			}
				$(document).scrollTop(0);
		}
		//Ctrl for next page  Shift for previous page
		if(event.keyCode == 16 || event.keyCode == 17){
			window.location.reload(true); 
			var reg = document.URL.match(/http:\/\/comic.sfacg.com\/HTML\/\w+\/\d+\/#p=/i); 



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
					$(document).scrollTop(0);
		}
	};
			
		
}

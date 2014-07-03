
//alert(document.URL);
var oldonload = window.onload || function (){};
window.onload = function () {
	oldonload();
	
	
	document.onkeydown = function(){
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

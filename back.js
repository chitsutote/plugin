
var today = new Date();
var hr = today.getHours();
var min = today.getMinutes();
var ip = "http://140.116.103.8/";
var user_id = "";

var mode = 1;
var count = 0;
chrome.alarms.clearAll();

chrome.browserAction.onClicked.addListener(function (tab) {
	if (mode == 1){
		console.log("icon clicked");
		//alert("Monitor is On");
		/*chrome.alarms.create('myAlarm', {
			periodInMinutes : 1.0
		});*/
		mode = 2;
		/*chrome.browserAction.setBadgeText({
		text:"0"});*/
		
	}
	else{
		console.log("cancel extension");
		//alert("Monitor is Off");
		//chrome.alarms.clearAll();
		mode = 1;
		/*chrome.browserAction.setBadgeText({
		text:""});*/
	}
	chrome.cookies.get({url:ip, name:"alarm_time"},function(cookie) {
		//console.log(cookie);
		console.log(cookie.value);
	});
});

//chrome.alarms.create("myalarm", {periodInMinutes:1.5});
/*chrome.alarms.onAlarm.addListener(function (alarm) {
	count++;
	if (count > 10);
	else {
		console.log("warning! warning!");
		alert("go to sleep! Hurry!");
	}
});*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab?
			"from content script = "+sender.tab.url:
			"from extension");
		
		//console.log(request.url);
		if(request.url != null && request.question != null){
			//console.log(request.url+'\n'+request.question);
			//console.log(request.Q);
			//console.log(request.bestA);
			var comment = prompt('Want to add a comment?');
			//alert(comment);
			chrome.cookies.get({url:"http://140.116.103.8", name:"fb_user"},function(cookie) {
				//console.log(cookie.value);
				user_id = cookie.value;
				console.log(user_id);
				$.ajax({
					type:"POST",
					url: "http://140.116.103.8/process.php",
					data:"url=" + request.url + "&uid=" + user_id + "&title=" + request.question + "&Q=" + request.Q + "&bestA=" + request.bestA + "&comment=" + comment,
					
					success: function (data) {
						console.log(data);
					},
					
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("error: "+ textStatus + " (" + errorThrown + ")");
					}
				});
			});
			
			
			sendResponse({how:"got"});
		}
		else{
			sendResponse({how:"question is null"});
		}
	}
);
/**************************    COMET   ****************************************/
var timestamp = 0;
function waitForMsg() {
	chrome.cookies.get({'url':ip, 'name':'fb_user'},function(cookie) {
		//user_id = cookie.value;
		console.log(cookie);
	});
	$.ajax({
		type:"GET",
		url:"http://testproject.serveftp.com/group_add.php?timestamp=" + timestamp,
		async:true,
		cache:false,
		
		success: function (data) {
			console.log(data);
			if(data.indexOf("Fatal error") != -1){
				console.log(timestamp);
			}
			else{
				var json = eval('(' + data + ')');
				console.log(json);
				if(json['msg'] != "") {
					var flag = 0;
					//////////////////////////////////////////////////////////////////////
					groups = json['msg'];
					console.log(groups);
					var group = groups.split("\n");
					for (var i=0 ; i < group.length-1 ; i++) {
					
						var cut1 = group[i].split(":");
						var cut2 = cut1[1].split(",");
						//console.log(cut2);
						for(var j=0 ; j<cut2.length ; j++) {
							console.log(cut2[j]);
							var temp1 = parseInt(cut2[j]);
							var temp2 = parseInt(user_id);
							if(temp1 == temp2) {
								flag++;
								alert('You\'ve been invited into Group:'+cut1[0]);
								break;
							}
						}
					}
					chrome.browserAction.setBadgeText({
					text:flag.toString()});
					//////////////////////////////////////////////////////////////////////
				}
			
				/*chrome.browserAction.setBadgeText({
				text:"0"});*/
				timestamp = json['timestamp'];
			}
			setTimeout('waitForMsg()', 1000);
			console.log("success");
		},
		
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("error: "+ textStatus + " (" + errorThrown + ")");
			setTimeout('waitForMsg()', 15000);
		}
	});
}

$(document).ready(function(){
	waitForMsg();
});
/****************************************************************************************************/
/*chrome.windows.onCreated.addListener(
	function (window) {*/
		chrome.windows.onRemoved.addListener(
			function (winId) {
				//alert(winId);
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth();
				var date = d.getDate();
				var day = d.getDay();
				var hour = d.getHours();
				var minute = d.getMinutes();
				chrome.cookies.get({url:"http://140.116.103.8/", name:"fb_user"},
					function (cookie) {
						user_id = cookie.value;
					}
				);
				//alert(user_id);
				$.ajax({
					type:"POST",
					url:ip + "process_sleeptime.php",
					data:"year="+year+"&month="+month+"&date="+date+"&day="+day+"&hour="+hour+"&minute="+minute+"&id="+user_id,
					success:function(data) {
						console.log(data);
					}, 
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("error: "+ textStatus + " (" + errorThrown + ")");
					}
				
				});
			}
		);
	/*}
);*/

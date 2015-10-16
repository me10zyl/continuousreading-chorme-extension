var PROFILE = ["dev","production"];
var profile = PROFILE[1];
$(function() {
      chrome.storage.local.get("userinfo", function(item){
      var loginSucess = item.userinfo.success;
      var username = item.userinfo.username;
      var password = item.userinfo.password;
      if(loginSucess)
      {
        login(username,password);
      }
      });
  
	$("#login").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if(username === null || password === null || username === "" || password === "")
		{
		  error("please input username & password");
			return;
		}
	  login(username,password);
	});
	$("#register").click(function(){
	  var username = $("#username").val();
		var password = $("#password").val();
		if(username === null || password === null || username === "" || password === "")
		{
		  error("please input username & password");
			return;
		}
		register(username,password);
	});
});

function error(message){
  	$(".error").html(message);
		$(".error").slideDown();
}

function login(username,password){
    var addr = "http://localhost:8080/continuousreading/user/login";
    if(profile === PROFILE[1])
    {
       addr = "http://zyl-me.xicp.net:1234/continuousreading/user/login";
    }
    loginOrRegister(addr,username,password);
}

function register(username,password){
  var addr = "http://localhost:8080/continuousreading/user/register";
  if(profile === PROFILE[1])
    {
       addr = "http://zyl-me.xicp.net:1234/continuousreading/user/register";
    }
  loginOrRegister(addr,username,password);
}

function loginOrRegister(addr,username,password)
{
  	$("#container").load(addr, {
			"username" : username,
			"password" : password
		},function(res){
		  if(res === null || res === "" || !$("#json")[0])
		  {
		    error("connect to server failed");
		    return;
		  }
		  var json = JSON.parse($("#json").text());
		  if(json.success)
		  {
		    chrome.storage.local.set({"userinfo" : json});
		  }
		  $("#returnPopup").slideDown();
		  $("#returnPopup").click(function(){
		    var json2 = json;
		     json2.success = false;
		     chrome.storage.local.set({"userinfo" : json2});
		  });
		  $("#username_to_send").ready(function(){
		      $("#username_to_send").click(function(){
		        send();
		      });
		  });
		  $("#url").ready(function(){
		      chrome.tabs.query({"active" : true}, function(tab){
		         $("#url").text(tab[0].url);
      });
		  });
		  });
}
function send(){
    chrome.tabs.query({"active" : true}, function(tab){
     alert(tab[0].url);
   });
}
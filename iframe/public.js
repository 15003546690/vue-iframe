var baseUrl='http://192.168.0.13:7500';
// var baseUrl='https://api.ifuturex.com:443';
//获取cookies
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
	return null;
}
//vue专用获取地址栏数据
function GetQueryString(name){
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(window.parent.document.URL)||[,""])[1].replace(/\+/g,'%20'))||null;
}
//获取iframe地址栏参数
function getQueryString(){
    var url = window.location.href;
    var num = url.indexOf("?");
    var str = url.substr(num + 1);
    var arr = str.split("&");
    var name = "";
    var value = "";
    for(var i = 0; i < arr.length; i++)
    {
        num = arr[i].indexOf("=");
        if(num > 0)
        {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
}
var actStage=new getQueryString().actStage
//axios请求
function ajaxPost(url,data,success){
	$.ajax({
		url:baseUrl+url+signParam(),
		type:'POST',
		async:true,
		data:JSON.stringify(data),
		dataType:'json',
		headers:{
			"Authorization":getCookie('token'),
			"Content-Type":"application/json;charset=UTF-8"
		},
		success:function(res){
			if(typeof success == 'function'){
				success(res)
			}		
		}
	})
}
//offsetTop
function goTop(id){
	var num = $('.'+id).offset().top+125+'px';
	$('html,body', window.parent.document).animate({scrollTop: num }, 500);
}
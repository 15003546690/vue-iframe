function PcCommon(){
	this.baseUrl='https://api.ifuturex.com:443';
	this.rankUrl='http://www.ifuturex.com/#/rank?actId='+this.GetQueryString('actId');
}
PcCommon.prototype={
	GetQueryString: function(name) {
		return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
	},
	ajaxPost:function(){
		$.ajax({
			url:this.baseUrl+url+signParam(),
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
	},
	goTop:function(id){
		var num = $('.'+id).offset().top+125+'px';
		$('html,body', window.parent.document).animate({scrollTop: num }, 500);
	}
}
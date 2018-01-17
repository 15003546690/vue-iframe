<template>
	<div class="active_content_body">
		<p class="active_content_img" @click='local(activity.cate,activity.activityId,activity.url)'>
			<img :src="activity.firstImg" />
		</p>
		<p class="active_content_text">
			<span class="active_content_time">{{activity.endWord}}</span>
			<i class="active_content_caption">{{activity.name}}</i>
		</p>
	</div>
</template>
<script>
export default {
	props: [
		'activity',
		'totalPage'
	],
	methods:{
		local(cate,id,url){
			console.log(cate)
			if(cate==1){
				window.open(url);
			}else if(cate==0){
				this.$router.push({path:'newActivity/'+id})//老板本
			}else{
				this.$router.push({path:'newActivity/'+id})//老板本//新版
			}
		}
	}
}
</script>

<style>
	.active_content_body{
		width: 592px;
		height: 342px;
		margin: 0px 8px 16px 8px;
		display: inline-block;
	}
	.active_content_img{
		width: 100%;
		height: 288px;
	}
	.active_content_img>img{
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.active_content_text{
		margin-top: 8px;
	}
	.active_content_time{
		height: 23px;
	    display: inline-block;
		background: #000000;
		line-height: 23px;
		color: #e7c77f;
		font-size: 12px;
		padding: 0 6px;
		margin: 0 10px;
	}
	.active_content_caption{
		color: #676767;
		font-size: 16px;
	}
</style>
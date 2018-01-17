<template>
	<div class="confirm_modal" >
		<div class="confirm_box">
			<div class="confirm_main_or">
				<div class="confirm_main_head">
					<p>提示</p>
					<span @click='hidee($event)'><img src="../../../assets/img/center/close.png"/></span>
				</div>
				<div class="confirm_text">
					<div class="confirm_text_box">
						<p v-show="pay==true">参加此活动需要支付{{ticket}}{{ticketType}}</p>
						<p v-show='pay==false'>付费失败</p>
					</div>
				</div>
				<div class="confirm_btn" v-show="pay==true">
					<button @click='hideeN($event)'>否</button>
					<button @click='yess'>是</button>
				</div>
				<div class="confirm_btn" v-show="pay==false">
					<button @click='hideeN($event)'>确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				num:null,
				pay:true
			}
		},
		props:[
			'ticket',
			'ticketType',
			'titleeDate'
		],
		methods:{
			hideeN(event){
				this.$emit('vClose')
			},
			hidee(event){
				this.$emit('vClose')
			},
			yess(){
				this.$CPOST('/activity/v1/activity/payTicket'+this.$signParam(),{
					activityId:this.$route.params.id
				},(res)=>{
					if(res.resultValue.status==true){
						if(this.titleeDate.groupType==2){
	    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId})
	    				}else{
	    					this.$router.push({path:'/group/'+this.titleeDate.titleId})
	    				}
					}else{
						this.pay=false
					}
				})
			}
		}
	}
</script>

<style scoped>
.confirm_modal{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	z-index: 5;
}
.confirm_box{
	width: 435px;
	height: 196px;
	background: #e6e6e6;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
}
.confirm_main_or{
	/*display: none;*/
}
.confirm_main,.confirm_main_or{
	width: 423px;
	height: 184px;
	background: #fff;
	border: 1px solid #c9c9c9;
	margin: auto;
	margin-top: 5px;
}
.confirm_main_head{
	width: 100%;
	height: 32px;
}
.confirm_main_head>p{
	float: left;
	line-height: 32px;
	color: #323232;
	font-size: 14px;
	padding-left: 13px;
}
.confirm_main_head>span{
	display: block;
	float: right;
	cursor: pointer;
}
.confirm_text{
	width: 340px;
	height: 85px;
	line-height: 85px;
	text-align: center;
	margin: auto;
}
.confirm_text_box{
	display: inline-block;
	vertical-align: middle;
}
.confirm_btn{
	width: 100%;
	height: 32px;
	text-align: center;
	color: #323232;
	font-size: 14px;
}
.confirm_btn>button{
	width: 98px;
	height: 32px;
	background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;
	border: 0;
	outline: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
</style>
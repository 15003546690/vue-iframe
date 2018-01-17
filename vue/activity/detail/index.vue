<template>
	<div>
		<!-- static/zhaochao.html  :src="list.url"-->
		<div style="display: block">
		<iframe src="static/zhaochao.html" frameborder=0 id='ifm' marginwidth="0" marginheight="0" scrolling="no" ref='iframe' @load="loaded" :height="h"></iframe>
		</div>
		<div style="padding-top: 22px; padding-bottom: 40px;" :style="{ background: list.bgcolor}">
		<div class='activity-detail' v-if='list.rankShow'>
			<p>我的排行：
				<span v-show='list.rankMsg.rank!=0'>{{list.rankMsg.rank}}名</span>
				<span v-show='list.rankMsg.rank==0'>未上榜</span>
			</p>
			<p v-show='list.rankMsg.rank!=0'>累计获利：
				<strong>+{{list.rankMsg.totalProfit}}</strong>
				<img v-show='list.rankMsg.moneyType==0' src="../../../assets/img/eventGroup/event_wuxian.png" alt="">
				<img v-show='list.rankMsg.moneyType==1' src="../../../assets/img/eventGroup/event_weilai.png" alt="">
			</p>
			<p v-show='list.rankMsg.rank!=0'>待领奖品：
				<span>{{list.rankMsg.prizeName}}&nbsp&nbsp
					<i>{{list.rankMsg.prizeNum}}个</i>
				</span><a @click='receive'>去领取&nbsp&gt</a>
			</p>
		</div>
		<!-- 一个题材组展示题材 -->
		<div v-if='list.eventGroupNum==1' class='activity-list'>
			<div class='activity-img'>
				<img v-show='list.eventGroups[0].groupType==0' src="../../../assets/img/newAct/activity_pj.png" alt="">
				<img v-show='list.eventGroups[0].groupType==1' src="../../../assets/img/newAct/activity_yc.png" alt="">
				<img v-show='list.eventGroups[0].groupType==2' src="../../../assets/img/newAct/activity_sg.png" alt="">
			</div>
			<!-- <div class='activity-list-title'><a href="javascript:;" @click="gotoGroup(list.eventGroups[0].groupId)">{{list.eventGroups[0].groupName}}</a></div> -->
			<div class='activity-list-title'><a href="javascript:;">{{list.eventGroups[0].groupName}}</a></div>
			<div class='activity-list-state'>
				<div class='activity-list-stateL'>状态：</div>
				<div v-show='list.eventGroups[0].groupStatus==0' class='activity-list-stateR'>进行中</div>
				<div v-show='list.eventGroups[0].groupStatus==1' class='activity-list-stateR'>已暂停</div>
				<div v-show='list.eventGroups[0].groupStatus==2 || list.eventGroups[0].groupStatus==3' class='activity-list-stateR'>已结束</div>
				<div v-show='list.eventGroups[0].groupStatus==4' class='activity-list-stateR'>即将开始</div>
			</div>
			<ul class='activity-list-box clearfix'>
				<!-- <li v-for='i in list.eventGroups[0].events' @click="list.eventGroups[0].events.length > 1 ? gotoGroup(list.eventGroups[0].groupId) : gotoEvent(i.eventId)"> -->
				<li v-for='i in list.eventGroups[0].events' @click='title(i.eventId,list.eventGroups[0])'>
					<img src="../../../assets/img/newAct/activity_pic.png" alt="">
					<p>{{i.eventName}}</p>
				</li>
			</ul>
			<div class='activity-list-bottom'>共{{list.eventGroups[0].eventNum}}个话题</div>
		</div>
		<!-- 多个题材组展示形式 -->
		<div v-if='list.eventGroupNum>1' class='activity-list-group'>
			<dl v-for='i in list.eventGroups' @click='title(i.events[0].eventId,i)'>
				<dt>
					<a href="javascript:;">
						<img src="../../../assets/img/newAct/activity_pic_group.png" alt="">
					</a>
				</dt>
				<dd>
					<h6>{{i.groupName}}</h6>
					<div class='activity-list-state'>
						<div class='activity-list-stateL'>状态：</div>
						<div v-show='i.groupStatus==0' class='activity-list-stateR'>进行中</div>
						<div v-show='i.groupStatus==1' class='activity-list-stateR'>已暂停</div>
						<div v-show='i.groupStatus==2 || list.eventGroups[0].groupStatus==3' class='activity-list-stateR'>已结束</div>
						<div v-show='i.groupStatus==4' class='activity-list-stateR'>即将开始</div>
					</div>
					<p>开始时间：2017/12/25 23:00 — 结束时间2017/01/25 23:00</p>
					<a>查看话题&nbsp&gt</a>
				</dd>
				<div class='activity-img'>
					<img v-show='i.groupType==0' src="../../../assets/img/newAct/activity_pj.png" alt="">
					<img v-show='i.groupType==1' src="../../../assets/img/newAct/activity_yc.png" alt="">
					<img v-show='i.groupType==2' src="../../../assets/img/newAct/activity_sg.png" alt="">
				</div>
			</dl>
		</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
		<confirm  :ticket='confirm.ticket' :ticketType='confirm.ticketType' :titleeDate='titleeDate' v-show='confirm.confirm' @vClose='vClose'/>
		<!-- <confirmNoPay class='confirmNoPay'/> -->
	</div>
</template>
<script>
import Login from '../../common/Login'
import confirm from '../confirm/confirmModal'
// import confirmNoPay from '../confirm/confirmNoPay'
import Aalert from '../../common/alert'
	export default{
		components: {
			Aalert,
	    	Login,
	    	confirm,
	    	// confirmNoPay,
	  	},
		data(){
			return{
				h:null,
				isShowLoginModal: false,
				alertText:null,
				alert:false,
				confirm:{
        			confirm:false,
        			ticket:null,
        			ticketType:null,
        		},
        		titleeDate:{
        			groupType:null,
        			titleId:null
        		},
        		path:null,//取决于跳 event || group 的路径
				list:{
					"url":'',
				    "actName": "",
				    "actStage": 1,
				    "activityId": 0,
				    bgcolor:'',
				    "eventGroupNum":2,
				    "eventGroups": [
				      {
				        "eventNum": 100,
				        "events": [
				          {
				            "eventId": 1,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "兰博基尼"

				          },
				          {
				            "eventId": 2,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "小牛"
				          },
				          {
				            "eventId": 3,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "红色的"
				          },
				          {
				            "eventId": 4,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "红色的"
				          }
				        ],
				        "groupEndTime": {
				          "date": 0,
				          "day": 0,
				          "hours": 0,
				          "minutes": 0,
				          "month": 0,
				          "nanos": 0,
				          "seconds": 0,
				          "time": 0,
				          "timezoneOffset": 0,
				          "year": 0
				        },
				        "groupId": 0,
				        "groupImg": "string",
				        "groupName": "中超第22轮国安上半场2球领先辽宁？",
				        "groupStartTime": {
				          "date": 0,
				          "day": 0,
				          "hours": 0,
				          "minutes": 0,
				          "month": 0,
				          "nanos": 0,
				          "seconds": 0,
				          "time": 0,
				          "timezoneOffset": 0,
				          "year": 0
				        },
				        "groupStatus": 4,//左状态
				        "groupType": 2,//右状态
				        "moneyType": 0
				      },
				      //第二个组
				      {
				        "eventNum": 100,
				        "events": [
				          {
				            "eventId": 1,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "兰博基尼"
				          },
				          {
				            "eventId": 2,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "小牛"
				          },
				          {
				            "eventId": 3,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "红色的"
				          },
				          {
				            "eventId": 4,
				            "eventImg": "../../../assets/img/newAct/activity_pic.png",
				            "eventName": "红色的"
				          }
				        ],
				        "groupEndTime": {
				          "date": 0,
				          "day": 0,
				          "hours": 0,
				          "minutes": 0,
				          "month": 0,
				          "nanos": 0,
				          "seconds": 0,
				          "time": 0,
				          "timezoneOffset": 0,
				          "year": 0
				        },
				        "groupId": 0,
				        "groupImg": "string",
				        "groupName": "中超第22轮国安上半场2球领先辽宁？",
				        "groupStartTime": {
				          "date": 0,
				          "day": 0,
				          "hours": 0,
				          "minutes": 0,
				          "month": 0,
				          "nanos": 0,
				          "seconds": 0,
				          "time": 0,
				          "timezoneOffset": 0,
				          "year": 0
				        },
				        "groupStatus": 4,//左状态
				        "groupType": 0,//右状态
				        "moneyType": 0
				      }
				      //第二个组结束
				    ],
				    "rankImg": {
				    	pc:'',
				    	app:''
				    },
				    "moneyType": 0,
				    "rankImg": {},
				    "rankMsg": {
				      "moneyType": 1,//豆豆的类型
				      "prizeName": "变形金刚抱枕",
				      "prizeNum": "1",
				      "rank": 11,//排名
				      "totalProfit": '8.650.00'//累计获利
				    },
				    "rankShow": true,
				    "ticket": {
				      "free": false,
				      "invite": false,
				      "join": false,
				      "root": false,
				      "ticketNum": 0,
				      "ticketType": 0
				    }
				}
			}
		},
		created(){
			console.log(this.$route.params.id)
			this.rank()
			//通过地址栏给iframe传值
			this.$router.push({path:this.$route.params.id+'?actStage='+this.list.actStage})
		},
		methods:{
			//控制弹层的显示隐藏
			vshow(){
				this.alert=false;
			},
			vClose(){
	  			this.confirm.confirm=false;
	  		},
			//控制iframe
			loaded(){
			 //    const vm = this.$refs.iframe.contentWindow;
			 //    var iframe = window.document.getElementById('ifm');
			 //    var bHeight = iframe.contentWindow.document.body.scrollHeight;
				// var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				// this.h = Math.max(bHeight, dHeight);
			    // this.h = vm.document.body.scrollHeight + 'px';
			    var iframeHeight = $("#ifm").contents().find("body").height();
			    this.h = iframeHeight;
			},
			//活动详情、排行请求
			rank(){
				this.$CPOST('/activity/v1/activity/showNewActivity',{
					activityId:this.$route.params.id
				},(res)=>{
					if(res.resultCode === 200){
						this.list = res.resultValue;
						console.log(this.list.bgcolor)
					}
				})
			},
			//去领取奖品
			receive(){
				this.$router.push({path:'/personal/assets/gift'})
			},
			//就那复杂的一堆判断
			title(id,i){
				alert(11)
				//是否跳申购传值
				this.titleeDate.groupType=i.groupType;
				//首先判断登录
				if(this.$store.state.refreshToken==''){
	  				this.isShowLoginModal=true;
	  				return false
	  			}
	  			//如果多个题材组&&某一个题材组下只有一个题材跳event否则跳group
	  			if(this.list.eventGroupNum>1){
	  				if(i.events.length>1){
		  				this.titleeDate.titleId=i.groupId;
		  				this.path='/group/'+i.groupId;
		  			}else{
		  				this.titleeDate.titleId=id;
		  				this.path='/event/'+id;
		  			}
	  			}else{
	  				this.titleeDate.titleId=i.groupId;
	  				this.path='/event/'+id;
	  			}
	  			//判断门票
		    		this.confirm.ticket=this.list.ticket.ticketNum;//数量
		    		if(this.list.ticket.ticketType==0){
		    			this.confirm.ticketType='金豆';
		    		}else{
		    			this.confirm.ticketType='未来豆';
		    		}
		    		if(this.list.activityStatus!=0){
		    			if(this.list.ticket.join==true){//是否已参加  /*记得改成true*/
		    				if(i.groupType==2){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:this.path});
		    				}
		    			}else{
		    				this.alert=true;
							this.alertText='活动已结束';
		    			}
		    		}else if(this.list.activityStatus==2){
		    			if(this.list.ticket.join==true){//是否已参加
		    				if(i.groupType==2){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:this.path});
		    				}
		    			}else{
		    				this.alert=true;
							this.alertText='活动已暂停';
		    			}
		    		}else{
		    			if(this.list.ticket.join==true){
		    				if(i.groupType==2){//跳申购
		    					this.$router.push({path:'/subscribe/?id='+this.titleeDate.titleId});
		    				}else{
		    					this.$router.push({path:this.path});
		    				}
		    			}else{
		    				if(this.list.ticket.free!=0){//付费
		    					this.confirm.confirm=true;
		    				}else{
		    					this.$CPOST('/activity/v1/activity/app/recordUserJoin',{//新版活动免费/v1/activity/app/recordUserJoin
									activityId:this.$route.params.id
								},(res)=>{
		    						this.alert=true;
									this.alertText='恭喜您成功参加该活动';
		    					})
		    				}
		    			}
		    		}
			},
			//关闭登录弹框
	  		hideLoginModal() {
	  			this.isShowLoginModal = false;
	  		},
		}
	}
</script>
<style scoped='scoped'>
	#ifm{
		width:100%;border:0;margin:0;padding:0;display: block;
	}
	.activity-detail{
		width: 1174px;background: #fdf0dd;line-height: 66px;margin: auto;margin-top: -18px;padding: 0 17px;height: 66px;
	}
	.activity-detail>p{
		color: #676767;margin-right: 70px;float: left;
	}
	.activity-detail>p>span{
		color: #323232;font-size: 24px;
	}
	.activity-detail>p>strong{
		color: #c60c1b;font-size: 20px;margin-right: 11px;
	}
	.activity-detail>p>a{
		margin-left: 20px;color: #c60c1b
	}
	.activity-list{
		width: 1174px;margin:auto;background: #fdf0dd;padding: 26px 17px;position: relative;overflow: hidden;
	}
	.activity-list-title{
		line-height: 28px;
	}
	.activity-list-title>a{color: #000;font-size: 28px;font-weight: bold;}
	.activity-list-state{
		width: 138px;height: 30px;border:solid 1px #d0222c;border-radius: 5px;margin-top: 17px;margin-bottom: 17px;
	}
	.activity-list-stateL{
		width: 53px;height: 30px;background: #d0222c;color: #fff;font-size: 14px;line-height: 30px;text-align: center;float: left;
	}
	.activity-list-stateR{
		width: 85px;text-align: center;line-height: 30px;color:#d0222c;font-size: 14px; float: left;
	}
	.activity-img{
		position: absolute;right: 0;top: 0;
	}
	.activity-list-box{
		width: 105%;
	}
	.activity-list-box>li{
		width: 266px;height: 212px;border:solid 1px #dbd7d2;border-radius: 5px;float: left;margin-right: 30px;margin-bottom: 20px; background: #fff; cursor:pointer;
	}
	.activity-list-box>li>p{
		line-height: 46px;padding: 0 10px;font-size: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
	}
	.activity-list-bottom{
		width: 100%;text-align: center;font-size: 18px;margin-top: 19px;font-weight: bold;
	}
	.activity-list-group>dl{
		width: 1160px;height: 220px;background: #eeeae5;border-radius: 10px;border:solid 1px #dbd7d2;position: relative;margin-bottom: 15px;margin-top: 15px;
	}
	.activity-list-group>dl>dt{
		width: 350px;height: 218px;float: left;
	}
	.activity-list-group>dl>dd{
		margin: 17px 15px;width: 720px;float: left;
	}
	.activity-list-group>dl>dd>h6{
		font-size: 22px;color: #444444
	}
	.activity-list-group>dl>dd>p{
		color: #676767;background: url(../../../assets/img/newAct/activity_clock.png) no-repeat 5px 3px;padding-left: 30px;font-size: 16px;margin-bottom: 20px;
	}
	.activity-list-group>dl>dd>a{
		font-size: 16px;color: #c60c1b;margin-left: 5px;
	}
	.activity-list-group{
		width: 1174px;margin:auto;background: #fdf0dd;margin-top: 22px;padding: 11px 17px;position: relative;overflow: hidden;
	}
	.confirmNoPay{display: none;
	}
</style>
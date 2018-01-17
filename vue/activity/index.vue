<template>
	<div class="active_main">
    	<p class="active_main_bg1"></p>
    	<div class="active_box">
    		<listPage v-for="item in activity" :key="item.activityId" :activity="item"></listPage>
    	</div>
    	<p class="active_main_bg2"></p>
    	<div class="paging">
	  		<el-pagination
		      	@size-change = "handleSizeChange"
		      	@current-change = "handleCurrentChange"
		      	:current-page = this.currentPage
		      	:page-size = 1
		      	layout = "prev, pager, next, jumper"
		      	:total = "totalPage" >
		    </el-pagination>
	  	</div>
    </div>
</template>

<script>
import listPage from './list/index'

export default{
	data () {
		return {
			activity: [],
			currentPage: 1,
			totalPage: 0
		}
	},
	components: {
	    listPage
  	},
  	created () {
  		$('.commonSearch').show()
  		setTimeout(()=>{
  			this.activityList();
  		},100)
  	},
  	methods: {
  		activityList() {
  			this.$CPOST('/activity/v1/activity/showActivityList', {
  				page: this.currentPage-1,
  				size: 8
  			},(res) => {
  				this.activity = res.resultValue.infos
  				this.totalPage = Math.ceil(res.resultValue.totalElement/8)
   			})
  		},
  		handleSizeChange(val) {
			this.pagesize = val;
	        this.activityList()
	    },
	    handleCurrentChange(val) {
    		this.currentPage = val;
    		this.activityList()
	    }
  	}
}
</script>

<style scoped>
.paging{
	position: absolute;
	width: 100%;
    left: 0;
    bottom: 40px;
    overflow: hidden;
}
.el-pagination{
	text-align: center;
	margin-top: 19px;
}
.active_main{
	width: 100%;
	min-height: 1200px;
	overflow: hidden;
	position: relative;
	background: url(../../assets/img/active/active_bg2.jpg) center;
	background-size: 100%;
    padding-bottom: 80px;
}
.active_main_bg1{
	width: 100%;
	height: 324px;
	background: url(../../assets/img/active/active_bg1.png) no-repeat center;
	background-size: cover;
}
.active_main_bg2{
	width: 100%;
	height: 312px;
	background: url(../../assets/img/active/active_bg3.png) no-repeat center;
	background-size: cover;
	position: absolute;
	bottom: 0;
}
.active_box{
	width: 1232px;
    background: #ffffff;
    margin: auto;
    margin-top: -274px;
    padding-top: 19px;
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}
</style>
<template>
	<div class="moneylinebox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" style="float:left">
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getline" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="linebox">
			<div id="echart" style="position: relative; overflow: hidden; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"></div>
		</section>
	</div>
</template>
<script>
import { getline } from '../api/api.js'
let echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/line");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
	export default {
		data() {
			return {
				drawData:[],
				drawname:[],
				drawtime:[],
				datalist:[],
				timelist:[],
			}
		},
		created() {
			this.getline();
		},
		mounted() {
			this.draw();
		},
		methods: {
			getline() {
				let Params = {
					startDate:this.timelist?this.timelist[0]:'',
					endDate:this.timelist?this.timelist[1]:''
				};
				getline(Params).then(data => {
					if(data.code != 200){
		                this.$message({
		                  message : data.msg,
		                  type : 'error'
		                });
	              	}else{
	              		this.drawData = data.obj
	              		let newa = this.drawData.map(function(item){
	              			return item['name']
	              		})
	              		this.drawname = newa
	              		let drawtime = this.drawData[0].data.map(function(item){
	              			return item['propertiesName']
	              		})
	              		this.drawtime = drawtime
	              		let dataarray = [];
	              		for(let [i,dataitem] of this.drawData.entries()){
	              			 dataarray = dataitem.data.map(function(item){
		              			return item['propertiesValue']
		              		})
		              		this.datalist[i] = dataarray
	              		}
	              	}
				})
			},
			draw() {
				let worldMapContainer = document.getElementById('echart')
				let resizeWorldMapContainer = function () {
		          // worldMapContainer.style.width = window.innerWidth + 'px'
		          worldMapContainer.style.height = window.innerHeight * 0.59 + 'px'
		        }
		        resizeWorldMapContainer()
		        let myChart = echarts.init(worldMapContainer)
				myChart.setOption({
			        title: {
				        text: '收入趋势图'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:this.drawname
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    toolbox: {
				        feature: {
				            saveAsImage: {}
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: this.drawtime
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:this.drawname[0],
				            type:'line',
				            // stack: '总量',
				            data:this.datalist[0]
				        },
				        {
				            name:this.drawname[1],
				            type:'line',
				            // stack: '总量',
				            data:this.datalist[1]
				        },
				        {
				            name:this.drawname[2],
				            type:'line',
				            // stack: '总量',
				            data:this.datalist[2]
				        }
				    ]
		      });
				window.onresize = function () {
		          resizeWorldMapContainer()
		          myChart.resize()
		        }
			}
		},
		watch: {
	      drawData: function () {
	        this.draw()
	      }
	    }
	}
</script>
<style lang="stylus">
	.moneylinebox
		overflow:hidden
		.linebox
			margin-top:100px;
</style>
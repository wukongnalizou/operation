<template>
	<div class="fansexbox">
		<section class="echartsbox">
			<div id="echart" style="position: relative; overflow: hidden; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"></div>
		</section>
		<section class="databox">
			<el-table :data="drawData" highlight-current-row  style="width: 100%;">
				<el-table-column prop="name" label="性别" align="center">
				</el-table-column>
				<el-table-column prop="value" label="人数" align="center">
				</el-table-column>
			</el-table>
		</section>
	</div>
</template>
<script>
import { getSex } from '../api/api.js'
let echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/pie");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

	export default {
		data() {
			return {
				drawData:[],
				drawname:[],
			}
		},
		created() {
			this.getSex();
		},
		mounted() {
			this.draw();
		},
		methods: {
			getSex() {
				getSex().then(data => {
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
	              	}
				})
			},
			draw() {
				let worldMapContainer = document.getElementById('echart')
				let resizeWorldMapContainer = function () {
		          // worldMapContainer.style.width = window.innerWidth + 'px'
		          worldMapContainer.style.height = window.innerHeight * 0.29 + 'px'
		        }
		        resizeWorldMapContainer()
		        let myChart = echarts.init(worldMapContainer)
				myChart.setOption({
			        title : {
				        text: '粉丝性别统计',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left : '20%',
				        bottom: '0px',
				        data: this.drawname
				    },
				    series : [
				        {
				            name: '性别占比',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:this.drawData,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
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
	// .fansexbox
	// 	.echartsbox
	// 		#echart
	// 			width:100%;
	// 			height:400px;
</style>
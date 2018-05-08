<template>
	<div class="publicmoneybox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="分销商" size="medium" style="width:320px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getmoney" size="medium">查询</el-button>
						<el-button type="success" size="medium">总计: {{totalmoney}}</el-button>
						<el-button type="warning" @click="makexcel" size="medium">导出</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="databox">
			<el-table :data="datalist" v-loading="listLoading" highlight-current-row  style="width: 100%;">
				<el-table-column prop="username" label="公众号" align="center">
				</el-table-column>
				<el-table-column prop="proportion" label="比例" align="center">
				</el-table-column>
				<el-table-column prop="money" label="收益" align="center">
				</el-table-column>
			</el-table>
			<el-col :span="24">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="total" style="float:right;margin-top:10px" background>
				</el-pagination>
			</el-col>
		</section>
	</div>
</template>
<script>
import { getmoney } from '../api/api.js'
export default {
	data() {
		return {
			searchbox: {
					condition: ''
				},
				datalist: [],
				timelist:[],
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				totalmoney:'0',
				sels: [],//列表选中列
		}
	},
	created(){
		this.getmoney()
	},
	methods:{
		getmoney(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			getmoney(Params).then(data=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.datalist = data.obj.list
              		this.totalmoney = data.spare
              		this.total = data.obj.total
              	}
              	this.listLoading = false;
			})
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getmoney();
		},
		makexcel(){
			let para = {};
			if(this.timelist){
				para = {
					startDate:this.timelist.length >0?this.timelist[0]:'',
					endDate:this.timelist.length >0?this.timelist[1]:''
				};
			}else{
				 para = {
					startDate:'',
					endDate:''
				};
			}
			//  para = {
			// startDate:this.timelist.length >0?this.timelist[0]:'',
			// endDate:this.timelist.length >0?this.timelist[1]:''
			// };
			window.location.href = 'http://192.168.1.39:8081//crxl/qpp/comicCps/exportExcel?startDate='+para.startDate+'&endDate='+para.endDate
		}
	}
}	
</script>
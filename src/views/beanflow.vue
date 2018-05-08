<template>
	<div class="beanflowbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="漫画名称" size="medium" style="width:320px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getbean" size="medium">查询</el-button>
						<el-button type="success" size="medium">总计: {{totalmoney}}</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="databox">
			<el-table :data="datalist" v-loading="listLoading" highlight-current-row  style="width: 100%;">
				<el-table-column prop="cartoonName" label="漫画名称" align="center">
				</el-table-column>
				<el-table-column prop="totalSum" label="咔咔豆收益" align="center">
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
import { getbean } from '../api/api.js'
export default {
	data() {
		return {
			searchbox: {
					condition: ''
				},
				datalist: [],
				timelist:[],
				totalmoney:'0',
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				sels: [],//列表选中列
		}
	},
	created(){
		this.getbean()
	},
	methods:{
		getbean(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			getbean(Params).then(data=>{
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
			this.getbean();
		},
	}
}	
</script>
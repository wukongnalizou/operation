<template>
	<div class="feedbackbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="用户id/昵称/内容" size="medium" style="width:320px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getFeedback" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="tablebox">
			<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="userName" label="昵称" width="200">
				</el-table-column>
				<el-table-column prop="userId" label="用户Id" width="350">
				</el-table-column>
				<el-table-column prop="content" label="内容">
				</el-table-column>
				<el-table-column prop="backDate" label="日期" width="200">
				</el-table-column>
				<!-- <el-table-column>
				</el-table-column> -->
			</el-table>
			<el-col :span="24">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="total" style="float:right;margin-top:10px" background>
				</el-pagination>
			</el-col>
		</section>
	</div>
</template>
<script>
import { getFeedback } from '../api/api.js'
export default {
	data() {
		return {
			searchbox: {
					condition: ''
				},
			timelist:[],
			datalist: [],
			total: 0,
			page: 1,
			size:10,
			listLoading: false,
			sels: [],//列表选中列
		}
	},
	created() {
		this.getFeedback();
	},
	methods:{
		getFeedback(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			getFeedback(Params).then(data=>{
				this.listLoading = false;
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.datalist = data.obj.list
              		this.total = data.obj.total
              	}
			})
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getFeedback();
		},
	}
}	
</script>
<style lang="stylus">
.feedbackbox
	.tablebox
		text-align:left;
</style>
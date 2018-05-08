<template>
	<div class="publicfansbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="分销商" size="medium" style="width:220px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getfans" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="databox">
			<el-table :data="datalist" v-loading="listLoading" highlight-current-row  style="width: 100%;">
				<el-table-column prop="username" label="公众号" align="center">
				</el-table-column>
				<el-table-column prop="money" label="人数" align="center">
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
import { getfans } from '../api/api.js'
export default {
	data() {
		return {
			searchbox: {
					condition: ''
				},
				datalist: [],
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				sels: [],//列表选中列
		}
	},
	created(){
		this.getfans()
	},
	methods:{
		getfans(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size
			};
			this.listLoading = true;
			getfans(Params).then(data=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.listLoading = false;
              		this.datalist = data.obj.list
              		this.total = data.obj.total
              	}
			})
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getfans();
		},
	}
}	
</script>
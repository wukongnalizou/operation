<template>
	<div class="customersbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="昵称/用户id" size="medium" style="width:320px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getUsers" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="tablebox">
			<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="userid"label="用户id" width="400" align="center">
				</el-table-column>
				<el-table-column prop="username" label="昵称" min-width="120" align="center">
				</el-table-column>
				<el-table-column label="vip" width="100" align="center">
					<template slot-scope="scope">
						<p v-if="scope.row.vipid==0">普通用户</p>
						<p v-if="scope.row.vipid==1">普通会员</p>
						<p v-if="scope.row.vipid==2">超级会员</p>
				    </template>
				</el-table-column>
				<el-table-column prop="truephone" label="电话" width="120" align="center">
				</el-table-column>
				<el-table-column prop="city" label="城市" width="100" align="center">
				</el-table-column>
				<el-table-column  label="头像" width="120" align="center">
					<template slot-scope="scope">
						<div class="imgbox">
							<img :src="scope.row.headimgurl">
						</div>
				    </template>
				</el-table-column>
				<el-table-column prop="integral" label="咔咔豆" width="100" align="center">
				</el-table-column>
				<el-table-column prop="startdate" label="vip开始时间" width="150" align="center">
				</el-table-column>
				<el-table-column prop="enddate" label="vip结束时间" width="150" align="center">
				</el-table-column>
				<el-table-column  label="">
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
import { customerData } from '../api/api.js'
export default {
	data() {
		return {
			searchbox: {
					condition: ''
				},
				users: [],
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				sels: [],//列表选中列
		}
	},
	created(){
		this.getUsers()
	},
	methods:{
		getUsers(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size
			};
			this.listLoading = true;
			customerData(Params).then(data=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.listLoading = false;
              		this.users = data.obj.list
              		this.total = data.obj.total
              	}
			})
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getUsers();
		},
	}
}
</script>
<style lang="stylus">
.customersbox
	.tablebox
		.imgbox
			width:30px;
			height:30px;
			img
				width:100%;
				height:100%;	
</style>
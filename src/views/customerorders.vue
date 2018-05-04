<template>
	<div class="customerorderbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="用户id/订单号/昵称" size="medium" style="width:320px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getOrders" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="tablebox">
			<el-table :data="orders" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="ordernum" label="订单号" width="350" align="center">
				</el-table-column>
				<el-table-column prop="orderuserid" label="用户Id" width="350" align="center">
				</el-table-column>
				<el-table-column prop="orderintegral" label="渠道" width="120" align="center">
				</el-table-column>
				<el-table-column prop="orderusername" label="昵称" width="200" align="center">
				</el-table-column>
				<el-table-column prop="ordermoney" label="充值价格" width="100" align="center">
				</el-table-column>
				<el-table-column prop="orderremarks" label="商品名称" width="150" align="center">
				</el-table-column>
				<el-table-column prop="orderimpldate" label="日期" align="center">
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
import { getOrders } from '../api/api.js'
export default {
	data() {
		return {
			searchbox: {
					condition: ''
				},
				timelist:[],
				orders: [],
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				sels: [],//列表选中列
		}
	},
	created(){
		this.getOrders()
	},
	methods:{
		getOrders(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			getOrders(Params).then(data=>{
				this.listLoading = false;
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		
              		this.orders = data.obj.list
              		this.total = data.obj.total
              	}
			})
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getOrders();
		},
	}
}
</script>
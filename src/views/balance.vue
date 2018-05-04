<template>
	<div class="balancebox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="分销商" size="medium" style="width:220px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-select v-model="optionvalue" placeholder="请选择" size="medium">
						    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						    </el-option>
						  </el-select>
					</el-form-item>
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getBalance" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="tablebox">
			<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="withdrawalsdate" label="提现时间">
				</el-table-column>
				<el-table-column prop="remarks" label="分销商">
				</el-table-column>
				<el-table-column prop="ordersum" label="订单数量">
				</el-table-column>
				<el-table-column prop="todayrecharge" label="订单金额">
				</el-table-column>
				<el-table-column prop="proportion" label="分成比例">
				</el-table-column>
				<el-table-column prop="withdrawalsmoney" label="提现金额">
				</el-table-column>
				<el-table-column prop="withdrawalsstate" label="结算状态" align="center">
					<template scope="scope">
						<div class="checkbox" @click="balance(scope.$index,scope.row)" >
							<span class="el-icon-check" :class="{iconactive: scope.row.withdrawalsstate == 1}"></span>
						</div>
					</template>
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
import { getBalance,balance } from '../api/api.js'
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
			options:[
				{
					value:2,
					label:"全部"
				},
				{
					value:1,
					label:"已结"
				},
				{
					value:0,
					label:"未结"
				}
			],
			optionvalue:"",
			sels: [],//列表选中列
		}
	},
	created() {
		this.getBalance();
	},
	methods:{
		getBalance(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size,
			withdrawalsState:this.optionvalue,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			getBalance(Params).then(data=>{
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
			this.getBalance();
		},
		balance(index,row){
			if(row.withdrawalsstate){
				return false
			}
			this.$confirm('确认结算吗？', '提示', {}).then(() => {
				let para = {
					id:row.id
				}
				balance(para).then((data) => {
					if(data.code != 200){
		                this.$message({
		                  message : data.msg,
		                  type : 'error'
		                });
	              	}else{
	              		this.$message({
							message: '结算成功',
							type: 'success'
						});
						this.getBalance();
	              	}
					
				});
			}).catch(()=>{
				
			});
		}
	}
}	
</script>
<style lang="stylus">
.balancebox
	.tablebox
		text-align:left;
		.checkbox
			cursor:pointer;
			span
				font-weight:700
			.iconactive
				color:red	
</style>
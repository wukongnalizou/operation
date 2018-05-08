<template>
	<div class="cpsbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form>
					<el-form-item label="运营选择">
						<el-col :span="4">
							<template>
							  <el-select v-model="cpsvalue" placeholder="请选择" @change="optionchange">
							    <el-option v-for="item in options" :key="item.uid" :label="item.username" :value="item.uid">
							    </el-option>
							  </el-select>
							</template>
						</el-col>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="databox">
			<el-table :data="alldatalist" highlight-current-row  style="width: 100%;">
				<el-table-column prop="username" label="用户" align="center">
				</el-table-column>
				<el-table-column prop="monthrunwater" label="本月流水" align="center">
				</el-table-column>
				<el-table-column prop="monthprofit" label="本月收益" align="center">
				</el-table-column>
				<el-table-column prop="cpsrunwater" label="cps总流水" align="center">
				</el-table-column>
				<el-table-column prop="cpsprofitsum" label="cps总收益(与该版本同步)" align="center">
				</el-table-column>
				<el-table-column prop="cpsnum" label="cps总数" align="center">
				</el-table-column>
				<el-table-column prop="allrecharge" label="总收益" align="center">
				</el-table-column>
				<el-table-column prop="overrecharge" label="已提现" align="center">
				</el-table-column>
				<el-table-column prop="balance" label="未提现" align="center">
				</el-table-column>
			</el-table>
		</section>
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" style="float:right">
					<el-form-item>
						<el-date-picker format="yyyy 年 MM 月 dd 日" v-model="timelist" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="medium">
			    		</el-date-picker>
		    		</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="operatordata" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="databox">
			<el-table :data="datalist" v-loading="listLoading" highlight-current-row  style="width: 100%;">
				<el-table-column prop="impldate" label="日期" align="center">
				</el-table-column>
				<el-table-column prop="username" label="cps用户" align="center">
				</el-table-column>
				<el-table-column prop="monthrunwater" label="当日流水" align="center">
				</el-table-column>
				<el-table-column prop="monthprofit" label="当日收益" align="center">
				</el-table-column>
			<!-- 	<el-table-column prop="addcps" label="新增cps" align="center">
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
import { operatordata,alloperatordata,getCps } from '../api/api.js'
export default {
	data() {
		return {
				alldatalist: [],
				datalist:[],
				timelist:[],
				options:[],
				cpsvalue:'',
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				sels: [],//列表选中列
		}
	},
	created() {
		this.getCps();
		// this.getdata();
		// this.operatordata();
	},
	methods: {
		getdata(){
			let Params = {
				uid:this.cpsvalue
			};
			alloperatordata(Params).then(data => {
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
	                this.alldatalist = []
              	}else{
              		this.alldatalist = data.obj
              	}
			})
		},
		operatordata(){
			let Params = {
			uid:this.cpsvalue,
			pageNum: this.page,
			pageSize: this.size,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			operatordata(Params).then(data => {
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
	                this.datalist = []
              	}else{
              		this.datalist = data.obj.list
              		this.total = data.obj.total
              	}
              	this.listLoading = false;
			})
		},
		getCps(){
			getCps().then(data=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.options = data.obj;
              		this.cpsvalue = this.options[0].uid
              		this.getdata();
					this.operatordata();
              	}
			})
		},
		optionchange() {
			this.getdata();
			this.operatordata();
			this.timelist = []
		},
		handleCurrentChange(val) {
			this.page = val;
			this.operatordata();
		},
	}
}
</script>
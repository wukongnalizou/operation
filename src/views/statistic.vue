<template>
	<div class="statisticbox">
		<section class="databox">
			<el-table :data="alldatalist" highlight-current-row  style="width: 100%;">
				<el-table-column prop="visternum" label="总用户" align="center">
				</el-table-column>
				<el-table-column prop="vipuseraddnum" label="总vip数" align="center">
				</el-table-column>
				<el-table-column prop="svipuseraddnum" label="总svip数" align="center">
				</el-table-column>
				<el-table-column prop="paynum" label="总订单数" align="center">
				</el-table-column>
				<el-table-column prop="paypersonnum" label="总支付人数" align="center">
				</el-table-column>
				<el-table-column prop="dailyvisteraddnum" label="总流水" align="center">
				</el-table-column>
				<el-table-column prop="beanincome" label="总豆收入" align="center">
				</el-table-column>
				<el-table-column prop="aru" label="aru" align="center">
				</el-table-column>
				<el-table-column prop="arpu" label="arpu" align="center">
				</el-table-column>
				<el-table-column prop="arppu" label="arppu" align="center">
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
						<el-button type="primary" @click="gethistorydata" size="medium">查询</el-button>
						<!-- <el-button type="success" @click="makexcel" size="medium">导出</el-button> -->
					</el-form-item>
				</el-form>
			</el-col>
		</section>
		<section class="databox">
			<el-table :data="datalist" v-loading="listLoading" highlight-current-row  style="width: 100%;">
				<el-table-column prop="impldate" label="日期" align="center">
				</el-table-column>
				<el-table-column prop="dailyvisternum" label="日访问量" align="center">
				</el-table-column>
				<el-table-column prop="vipuseraddnum" label="日新增vip" align="center">
				</el-table-column>
				<el-table-column prop="svipuseraddnum" label="日新增svip" align="center">
				</el-table-column>
				<el-table-column prop="paynum" label="日订单数" align="center">
				</el-table-column>
				<el-table-column prop="paypersonnum" label="日支付人数" align="center">
				</el-table-column>
				<el-table-column prop="dailyvisteraddnum" label="日流水" align="center">
				</el-table-column>
				<el-table-column prop="beanincome" label="日豆收入" align="center">
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
import { getdata,gethistorydata,makexcel } from '../api/api.js'
export default {
	data() {
		return {
				alldatalist: [],
				datalist:[],
				timelist:[],
				total: 0,
				page: 1,
				size:10,
				listLoading: false,
				sels: [],//列表选中列
		}
	},
	created() {
		this.getdata();
		this.gethistorydata();
	},
	methods: {
		getdata(){
			// let Params = {
			// pageNum: this.page,
			// pageSize: this.size,
			// startDate:this.timelist?this.timelist[0]:'',
			// endDate:this.timelist?this.timelist[1]:''
			// };
			this.listLoading = true;
			getdata().then(data => {
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.alldatalist = data.obj
              	}
              	this.listLoading = false;
			})
		},
		gethistorydata(){
			let Params = {
			pageNum: this.page,
			pageSize: this.size,
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			this.listLoading = true;
			gethistorydata(Params).then(data => {
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.datalist = data.obj.list
              		this.total = data.obj.total
              	}
              	this.listLoading = false;
			})
		},
		handleCurrentChange(val) {
			this.page = val;
			this.gethistorydata();
		},
		makexcel(){
			let Params = {
			startDate:this.timelist?this.timelist[0]:'',
			endDate:this.timelist?this.timelist[1]:''
			};
			makexcel(Params)
			// window.location.href = 'http://192.168.1.39:8081//crxl/qpp/comicCps/exportExcel?startDate='+Params.startDate+'&endDate='+Params.endDate
			// window.location.href = 'http://192.168.1.39:8081//crxl/qpp/comicCps/exportExcel'
		}
	}
}
</script>
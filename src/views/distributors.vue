<template>
	<div class="distributorbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="searchbox" style="float:left">
					<el-form-item>
						<el-input v-model="searchbox.condition" placeholder="分销商" size="medium" style="width:220px"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getdistributors" size="medium">查询</el-button>
					</el-form-item>
				</el-form>
				<el-button type="primary" v-on:click="addFormVisible = true" size="medium" style="float:right;margin-right:50px;">新建分销商</el-button>
			</el-col>
		</section>
		<section class="tablebox">
			<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			        	<el-form-item label="账号">
			            <span>{{ props.row.username }}</span>
			          </el-form-item>
			          <el-form-item label="用户名">
			            <span>{{ props.row.nickname }}</span>
			          </el-form-item>
			          <el-form-item label="渠道">
			            <span>{{ props.row.qd }}</span>
			          </el-form-item>
			          <el-form-item label="分成比例">
			            <span>{{ props.row.proportion }}</span>
			          </el-form-item>
			          <el-form-item label="总值">
			            <span>{{ props.row.allrecharge }}</span>
			          </el-form-item>
			          <el-form-item label="已提现">
			            <span>{{ props.row.overrecharge }}</span>
			          </el-form-item>
			          <el-form-item label="余额">
			            <span>{{ props.row.balance }}</span>
			          </el-form-item>
			          <el-form-item label="支付类型">
			            <span>{{ props.row.paytype }}</span>
			          </el-form-item>
			          <el-form-item label="付款账号">
			            <span>{{ props.row.accountnum }}</span>
			          </el-form-item>
			          <el-form-item label="付款人">
			            <span>{{ props.row.accountname }}</span>
			          </el-form-item>
			          <el-form-item label="手机号">
			            <span>{{ props.row.phone }}</span>
			          </el-form-item>
			          <el-form-item label="邮箱">
			            <span>{{ props.row.email }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
				<el-table-column prop="nickname" label="用户名">
				</el-table-column>
				<el-table-column prop="qd" label="渠道" width="300">
				</el-table-column>
				<el-table-column prop="proportion" label="分成比例">
				</el-table-column>
				<el-table-column prop="allrecharge" label="总值">
				</el-table-column>
				<el-table-column prop="overrecharge" label="已提现">
				</el-table-column>
				<el-table-column prop="balance" label="余额">
				</el-table-column>
				<el-table-column prop="state" label="使用状态" align="center">
					<template scope="scope">
						<div class="checkbox" @click="updatedistributor(scope.row)">
							<span class="el-icon-check" :class="{iconactive: scope.row.state == 1}"></span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="backDate" label="操作" align="center">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button v-if="!scope.row.usertype" size="small" type="primary" @click="binding(scope.$index, scope.row)">绑定</el-button>
						<el-button size="small" v-else type="success" @click="Untie(scope.$index, scope.row)">解绑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-col :span="24">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="total" style="float:right;margin-top:10px" background>
				</el-pagination>
			</el-col>
		</section>
		<section class="dialogedit">
			<el-dialog title="编辑" :visible.sync="editFormVisible" center>
				<el-form :model="editForm" label-width="40%" ref="editForm">
					<el-form-item label="账号">
						<el-col :span="8">
							<el-input v-model="editForm.username" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="渠道">
						<el-col :span="8">
							<el-input v-model="editForm.qd" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="用户名">
						<el-col :span="8">
							<el-input v-model="editForm.nickname" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="email">
						<el-col :span="11">
							<el-input v-model="editForm.email" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="电话">
						<el-col :span="8">
							<el-input v-model="editForm.phone" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="付款账号">
						<el-col :span="8">
							<el-input v-model="editForm.accountnum" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="收款人">
						<el-col :span="6">
							<el-input v-model="editForm.accountname" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="支付类型">
						<el-col :span="6">
							<el-input v-model="editForm.paytype" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="分成比例">
						<el-col :span="4">
							<el-input v-model="editForm.proportion" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false" size="medium">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="medium">提交</el-button>
				</div>
			</el-dialog>
		</section>
		<section class="dialogadd">
			<el-dialog title="新建" :visible.sync="addFormVisible" center>
				<el-form :model="addForm" label-width="40%" ref="addForm" :rules="rules" status-icon>
					<el-form-item label="账号" prop="username">
						<el-col :span="8">
							<el-input v-model="addForm.username" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="渠道" prop="qd">
						<el-col :span="8">
							<el-input v-model="addForm.qd" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="用户名" prop="nickname">
						<el-col :span="8">
							<el-input v-model="addForm.nickname" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="密码" prop="userpwd">
						<el-col :span="8">
							<el-input v-model="addForm.userpwd" type="password" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-col :span="8">
							<el-input v-model="addForm.checkPass" type="password" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="email">
						<el-col :span="11">
							<el-input v-model="addForm.email" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="电话">
						<el-col :span="8">
							<el-input v-model="addForm.phone" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="付款账号">
						<el-col :span="8">
							<el-input v-model="addForm.accountnum" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="收款人">
						<el-col :span="6">
							<el-input v-model="addForm.accountname" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="支付类型">
						<el-col :span="6">
							<el-input v-model="addForm.paytype" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="分成比例">
						<el-col :span="4">
							<el-input v-model="addForm.proportion" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="运营选择">
						<el-col :span="10">
							<template>
							  <el-select v-model="addForm.usertype" placeholder="请选择">
							    <el-option v-for="item in cpsForm.options" :key="item.uid" :label="item.username" :value="item.uid">
							    </el-option>
							  </el-select>
							</template>
						</el-col>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false" size="medium">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading" size="medium">提交</el-button>
				</div>
			</el-dialog>
		</section>
		<section class="dialogcps">
			<el-dialog title="绑定cps" :visible.sync="cpsFormVisible" center>
				<el-form :model="cpsForm" label-width="40%" ref="cpsForm">
					<el-form-item label="运营选择">
						<el-col :span="10">
							<template>
							  <el-select v-model="cpsvalue" placeholder="请选择">
							    <el-option v-for="item in cpsForm.options" :key="item.uid" :label="item.username" :value="item.uid">
							    </el-option>
							  </el-select>
							</template>
						</el-col>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="cpsFormVisible = false" size="medium">取消</el-button>
					<el-button type="primary" @click.native="cpsSubmit" :loading="cpsLoading" size="medium">提交</el-button>
				</div>
			</el-dialog>
		</section>
		<section class="dialogUntie">
			<el-dialog title="解绑cps" :visible.sync="uniteFormVisible" center>
				<el-form :model="UntieForm" label-width="40%" ref="UntieForm">
					<el-form-item label="修改密码">
						<el-col :span="10">
							<el-input v-model="unitepassword" placeholder="请输入密码" type="password"></el-input>
						</el-col>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="hideunite" size="medium">取消</el-button>
					<el-button type="primary" @click.native="uniteSubmit" :loading="uniteLoading" size="medium">提交</el-button>
				</div>
			</el-dialog>
		</section>
		<section class="dialogstate">
			<el-dialog title="锁定账号" :visible.sync="stateFormVisible" center>
				<el-form :model="stateForm" label-width="40%" ref="stateForm">
					<el-form-item label="修改密码">
						<el-col :span="10">
							<el-input v-model="statepassword" placeholder="请输入密码" type="password"></el-input>
						</el-col>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="hidestate" size="medium">取消</el-button>
					<el-button type="primary" @click.native="stateSubmit" :loading="uniteLoading" size="medium">提交</el-button>
				</div>
			</el-dialog>
		</section>
	</div>
</template>
<script>
import { getdistributors,updatedistributor,getCps,Untie,addDistributor,updateDistributorstate } from '../api/api.js'
export default {
	data() {
		var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addForm.checkPass !== '') {
            this.$refs.addForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addForm.userpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
		return {
			searchbox: {
					condition: ''
				},
			datalist: [],
			total: 0,
			page: 1,
			size:10,
			listLoading: false,
			editFormVisible:false,
			addFormVisible:false,
			cpsFormVisible:false,
			uniteFormVisible:false,
			stateFormVisible:false,
			editForm:{},
			addForm:{},
			cpsForm:{},
			UntieForm:{},
			stateForm:{},
			editLoading:false,
			addLoading:false,
			cpsLoading:false,
			uniteLoading:false,
			distributorId:'',
			rowdata:{},
			statedata:{},
			sels: [],//列表选中列
			cpsvalue:'',
			unitepassword:'',
			statepassword:'',
			rules: {
				username: [
	           	 	{ required: true, message: '请输入账号', trigger: 'blur' },
	          	],
	          	qd: [
	           	 	{ required: true, message: '请输入渠道', trigger: 'blur' },
	          	],
	          	nickname: [
	           	 	{ required: true, message: '请输入用户名', trigger: 'blur' },
	          	],
	          	userpwd: [
	          	 	{ validator: validatePass, trigger: 'blur' }
	          	],
	         	checkPass: [
	            	{ validator: validatePass2, trigger: 'blur' }
	          	],
	        }
		}
	},
	created() {
		this.getdistributors();
		this.getCps()
	},
	methods:{
		getdistributors(){
			let Params = {
			condition:this.searchbox.condition,
			pageNum: this.page,
			pageSize: this.size,
			};
			this.listLoading = true;
			getdistributors(Params).then(data=>{
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
			this.getdistributors();
		},
		updatedistributor(row){
			// let distributorstate=Boolean;
			if(row.state){
				this.stateFormVisible = true;
				this.statedata = row
			}else{
				this.$confirm('确认修改吗？', '提示', {}).then(() => {
				let Params = {
						condition:this.searchbox.condition,
						pageNum: this.page,
						pageSize: this.size,
						id:row.id,
						state:1
					};
				this.listLoading = true;
				updatedistributor(Params).then(data=>{
					this.listLoading = false;
					if(data.code != 200){
			                this.$message({
			                  message : data.msg,
			                  type : 'error'
			                });
		              	}else{
		              		this.getdistributors();
		              	}
					})
				}).catch(()=>{
				});
			}
			// console.log(row)
		},
		handleEdit(index,row){
			this.editFormVisible = true;
			this.editForm = Object.assign({}, row);
		},
		editSubmit() {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						let para = Object.assign({}, this.editForm);
						updatedistributor(para).then((data) => {
							this.editLoading = false;
							if(data.code != 200){
				                this.$message({
				                  message : data.msg,
				                  type : 'error'
				                });
			              	}else{
			              		this.$message({
				                  message : data.msg,
				                  type : 'success'
				                });
			              	}
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getdistributors();
						});
					});
				}
			});
		},
		cpsSubmit() {
			this.$confirm('确认绑定吗？', '提示', {}).then(() => {
				let Params = {
						condition:this.searchbox.condition,
						pageNum: this.page,
						pageSize: this.size,
						id:this.distributorId,
						usertype:this.cpsvalue
					};
				this.cpsLoading = true;
				updatedistributor(Params).then(data=>{
					this.cpsLoading = false;
					if(data.code != 200){
		                this.$message({
		                  message : data.msg,
		                  type : 'error'
		                });
	              	}else{
	              		this.$message({
		                  message : data.msg,
		                  type : 'success'
		                });
	              		this.getdistributors();
	              	}
	                this.cpsFormVisible = false;
				}).catch(()=>{
					
				})
			})
		},
		addSubmit() {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						addDistributor(para).then((data) => {
							this.addLoading = false;
							if(data.code != 200){
				                this.$message({
				                  message : data.msg,
				                  type : 'error'
				                });
			              	}else{
			              		this.$message({
				                  message : data.msg,
				                  type : 'success'
				                });
			              		this.getdistributors();
			              	}
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
						});
					});
				}
			});
		},
		getCps() {
			let para = {}
			getCps(para).then((data)=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.cpsForm.options = data.obj;
              	}
			})
		},
		uniteSubmit() {
			let para = {
				id : this.rowdata.id,
				userType : this.rowdata.usertype,
				password : this.unitepassword
			}
			Untie(para).then(data=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.$message({
	                  message : data.msg,
	                  type : 'success'
	                });
              		this.getdistributors();
              	}
              	this.unitepassword = '';
                this.uniteFormVisible = false;
			}).catch(()=>{
				
			})
		},
		binding(index,row){
			this.cpsFormVisible = true;
			this.distributorId = row.id
			// this.cpsForm = Object.assign({}, row);
		},
		Untie(index,row){
			this.uniteFormVisible = true;
			this.rowdata = row;
		},
		hideunite(){
			this.uniteFormVisible = false;
			this.unitepassword = '';	
		},
		stateSubmit(){
			let para = {
				id : this.statedata.id,
				userType : this.statedata.usertype,
				password : this.statepassword,
				passType : this.statedata.usertype ? 1: 0
			}
			updateDistributorstate(para).then(data=>{
				if(data.code != 200){
	                this.$message({
	                  message : data.msg,
	                  type : 'error'
	                });
              	}else{
              		this.$message({
	                  message : data.msg,
	                  type : 'success'
	                });
              		this.getdistributors();
              	}
              	this.statepassword = '';
                this.stateFormVisible = false;
			}).catch(()=>{
				
			})
		},
		hidestate(){
			this.stateFormVisible = false;
			this.statepassword = '';	
		}
	}
}	
</script>
<style lang="stylus">
.distributorbox
	.tablebox
		text-align:left
		.demo-table-expand
			font-size:0;
			.el-form-item
				margin-right:0;
				margin-bottom:0;
				width:30%;
				label
					width:90px;
					color:#99a9bf;
		.checkbox
			cursor:pointer;
			span
				font-weight:700
			.iconactive
				color:red			
					
	// .demo-table-expand
	// 	font-size: 0 
	// 	label
	// 	    width: 90px
	// 	    color: #99a9bf
	// .demo-table-expand
	// 	.el-form-item
	// 	    margin-right: 0
	// 	    margin-bottom: 0
	// 	    width: 50%
</style>
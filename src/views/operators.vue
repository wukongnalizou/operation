<template>
	<div class="operatorsbox">
		<section class="searchbox">
			<el-col :span="24" class="toolbar">
				<el-button type="primary" v-on:click="addFormVisible = true" size="medium" style="float:right;margin-right:50px;">新建运营</el-button>
			</el-col>
		</section>
		<section class="tablebox">
			<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="uid" label="id" align="center">
				</el-table-column>
				<el-table-column prop="username" label="用户名" align="center">
				</el-table-column>
				<el-table-column prop="isSystem" label="身份" align="center">
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间" align="center">
				</el-table-column>
			</el-table>
		</section>
		<section class="dialogadd">
			<el-dialog title="新建" :visible.sync="addFormVisible" center>
				<el-form :model="addForm" label-width="40%" ref="addForm" :rules="rules" status-icon>
					<el-form-item label="账号" prop="username">
						<el-col :span="8">
							<el-input v-model="addForm.username" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="密码" prop="userpwd">
						<el-col :span="8">
							<el-input v-model="addForm.password" type="password" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-col :span="8">
							<el-input v-model="addForm.checkPass" type="password" auto-complete="off"></el-input>
						</el-col>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false" size="medium">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" size="medium">提交</el-button>
				</div>
			</el-dialog>
		</section>
	</div>
</template>
<script>
import { getCps,createCps } from '../api/api.js'
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
	        } else if (value !== this.addForm.password) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
			return {
				datalist: [],
				listLoading: false,
				addFormVisible:false,
				addForm:{},
				rules: {
					username: [
		           	 	{ required: true, message: '请输入账号', trigger: 'blur' },
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
			this.getCps();
		},
		methods:{
			getCps(){
				let Params = {
				pageNum: this.page,
				pageSize: this.size,
				};
				this.listLoading = true;
				getCps(Params).then(data=>{
					this.listLoading = false;
					if(data.code != 200){
		                this.$message({
		                  message : data.msg,
		                  type : 'error'
		                });
	              	}else{
	              		this.datalist = data.obj
	              	}
				})
			},
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							console.log(para)
							createCps(para).then((data) => {
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
				              		this.getCps();
				              	}
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
							});
						});
					}
				});
			}
		}
	}
</script>
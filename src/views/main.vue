<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<!-- <el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col> -->
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" class="navbar">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in rolelist" v-if="!item.hidden">
						<el-submenu :index="index+''">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<!-- <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item> -->
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'漫画运营平台',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar:'http://p0opk9dxj.bkt.clouddn.com/xiaoshuo%20logo.png',
			}
		},
		created(){
			// this.fortest();
		},
		computed:{
			hasrouterarray:function(){
				let hasrouters =[];
				for(let i = 0;i<this.$router.options.routes.length;i++){
					if(!this.$router.options.routes[i].hidden){
						hasrouters.push(this.$router.options.routes[i])
					}
				}
				return hasrouters
			},
			rolelist:function(){
				let rolearray = [];
				let customerole = JSON.parse(sessionStorage.getItem('user')).isSystem;
				// console.log(customerole)
				if(customerole == 'admin'){
					return this.hasrouterarray;
				}else{
					for ( let [i,hasrouterarray] of this.hasrouterarray.entries() ) {
						if(hasrouterarray.role.indexOf(customerole) >=0){
							let child = [];
							for ( let [j,children] of hasrouterarray.children.entries() ) {
								if(children.role.indexOf(customerole) >= 0){
									child.push(children)
								}
							}
							hasrouterarray.children = child;
							rolearray.push(hasrouterarray);
						}
					}
					// console.log(rolearray)
					return rolearray;
				}
			},
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					this.$store.commit('LOGOUT')
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			// showMenu(i,status){
			// 	this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			// }
		},
		mounted() {
			// let user = {}
			let user = JSON.parse(sessionStorage.getItem('user'));
			let token = JSON.parse(sessionStorage.getItem('token'));
			this.$store.commit('RECORD_TOKEN',token)
            this.$store.commit('RECORD_USER',user)
			// if (user) {
				// user = JSON.parse(user);
			this.sysUserName = user.userName || '';
				// this.sysUserAvatar = user.avatar || '';
			// }
			// console.log(this.$router.options)

		}
	}

</script>

<style scoped lang="stylus">
	.container
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header
			height: 60px;
			line-height: 60px;
			background: baseColor;
			color:#fff;
			.userinfo
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner
					cursor: pointer;
					color:#fff;
					img
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
			.logo
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img 
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				
				.txt 
					color:#fff;
			.logo-width
				width:230px;
			.logo-collapse-width
				width:60px
			.tools
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
		.main
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside 
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu
					height: 100%;
				
				.collapsed
					width:60px;
					.item
						position: relative;
					.submenu
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
			.menu-collapsed
				flex:0 0 60px;
				width: 60px;
			.menu-expanded
				flex:0 0 230px;
				width: 230px;
			.navbar	
				ul
					// overflow:hidden;
					li
						padding-left:20px;
						// box-sizing:border-box;
						text-align:left;
			.content-container
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container
					//margin-bottom: 15px;
					.title 
						width: 200px;
						float: left;
						color: #475669;
					.breadcrumb-inner 
						float: right;
				.content-wrapper 
					background-color: #fff;
					box-sizing: border-box;
</style>
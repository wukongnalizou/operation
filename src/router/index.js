import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('../views/login.vue')), 'login')
const main = r => require.ensure([], () => r(require('../views/main.vue')), 'main')
const customers = r => require.ensure([], () => r(require('../views/customers.vue')), 'customers')
const customerorders = r => require.ensure([], () => r(require('../views/customerorders.vue')), 'customerorders')
const feedback = r => require.ensure([], () => r(require('../views/feedback.vue')), 'feedback')
const operators = r => require.ensure([], () => r(require('../views/operators.vue')), 'operators')
const operatordata = r => require.ensure([], () => r(require('../views/operatordata.vue')), 'operatordata')
const distributors = r => require.ensure([], () => r(require('../views/distributors.vue')), 'distributors')
const balance = r => require.ensure([], () => r(require('../views/balance.vue')), 'balance')
const beanorder = r => require.ensure([], () => r(require('../views/beanorder.vue')), 'beanorder')
const beanflow = r => require.ensure([], () => r(require('../views/beanflow.vue')), 'beanflow')
const publicmoney = r => require.ensure([], () => r(require('../views/publicmoney.vue')), 'publicmoney')
const fansex = r => require.ensure([], () => r(require('../views/fansex.vue')), 'fansex')
const publicfans = r => require.ensure([], () => r(require('../views/publicfans.vue')), 'publicfans')
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   hidden: true
    // },
    {
    	path:'/login',
    	name: 'login',
    	component:login,
    	hidden: true
    },
    {
    	path:'/main',
    	name: 'main',
    	component:main,
    	hidden: true
    },
    {
    	path:'/',
    	name:"用户模块",
    	component:main,
        role:["yunying"],
    	children:[
    		{
    			path:'/customer',
    			name:"用户列表",
    			component:customers,
                role:["yunying"],
    		},
    		{
    			path:'/customerorders',
    			name:"用户订单",
    			component:customerorders,
                role:["yunying"],
    		},
    		{
    			path:'/feedback',
    			name:"用户反馈",
    			component:feedback,
                role:["yunying"],
    		}
    	]
    },
    {
    	path:'/',
    	name:"运营模块",
    	component:main,
        role:["yunying"],
    	children:[
    		{
    			path:'/operators',
    			name:"运营列表",
    			component:operators,
                role:["admin"]
    		},
    		{
    			path:'/operatordata',
    			name:'运营数据',
    			component:operatordata,
                role:["yunying"],
    		}
    	]
    },
    {
    	path:'/',
    	name:"分销商模块",
    	component:main,
        role:["yunying"],
    	children:[
    		{
    			path:'/distributors',
    			name:"分销商",
    			component:distributors,
                role:["yunying"],
    		},
    		{
    			path:'/balance',
    			name:"结算",
    			component:balance,
                role:["yunying"],
    		}
    	]
    },
    {
    	path:"/",
    	name:"咔咔豆模块",
    	component:main,
        role:["yunying"],
        // leaf: true,
    	children:[
    		{
    			path:"/beanorder",
    			name:"咔咔豆订单",
    			component:beanorder,
                role:["yunying"],
    		},
    		// {
    		// 	path:"beanflow",
    		// 	name:"流水",
    		// 	component:beanflow
    		// }
    	]
    },
    {
    	path:"/",
    	name:"数据统计",
    	component:main,
        role:["caiwu"],
    	children:[
    		{
    			path:"/beanflow",
    			name:"咔咔豆收益",
    			component:beanflow,
                role:["caiwu"],
    		},
    		{
    			path:"/publicmoney",
    			name:"现金收益",
    			component:publicmoney,
                role:["caiwu"],
    		},
    		{
    			path:'publicfans',
    			name:"公众号粉丝",
    			component:publicfans,
                role:["caiwu"],
    		},
    		{
    			path:"/fansex",
    			name:"粉丝性别",
    			component:fansex,
                role:["caiwu"],
    		}
    	]
    }
  ]
})

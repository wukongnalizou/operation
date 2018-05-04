import axios from 'axios'
import store from '../store/index'
import router from '../router/index.js'
import qs from 'qs'
import { Message } from 'element-ui'
import {getToken} from './auth.js'
axios.defaults.timeout = 7000;                    // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.BASE_API;   // 配置接口地址
// axios.defaults.baseURL = 'http://distributor.kakamanhua.com/comicdis';
//添加请求拦截器
axios.interceptors.request.use(
    config => { 
      if (getToken()) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            // config.headers.Authorization = `${store.state.token}`;
            // config.headers['Authorization'] = getToken()
            config.headers.Authorization = getToken();
        }
      if (config.method === 'post') {
        config.data = qs.stringify(config.data);
      }
      // config.data = qs.stringify(config.data);
      return config;

    },
    error => {
      return Promise.reject(error);
    });
//添加响应拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
         // console.log(error.response.status);
            switch (error.response.status) {
                case 401:     
                    router.replace({
                        path: '/login',
                        // query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                case 403:    
                  Message({
                      message : '权限不足',
                      type : 'error'
                    });
                  break;
            }
        }
      return Promise.reject(error)
});
export default axios;
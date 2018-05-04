import {
	RECORD_TOKEN,
	RECORD_USER,
  	LOGOUT,
} from './mutation-types'
export default {
	[RECORD_TOKEN](state,info){
		state.token = info
	},
	[RECORD_USER](state,info){
		state.user = info
	},
	[LOGOUT](state){
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user');
		state.token = '';
		state.user = {};
	}
}
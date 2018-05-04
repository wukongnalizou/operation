import axios from '../config/axios.js'
export const userLogin = params => { return axios.post('/crxl/qpp/comicCps/cpsAdminLogin', params).then(res => res.data); };

export const customerData = params => { return axios.post('/crxl/qpp/comicCps/admin/get/getAllUser', params).then(res => res.data); };

export const getOrders = params => { return axios.post('/crxl/qpp/comicCps/admin/get/getAllUserOrder', params).then(res => res.data); };

export const getFeedback = params => { return axios.post('/crxl/qpp/comicCps/admin/get/getAllFeedBack', params).then(res => res.data); };

export const getBalance = params => { return axios.post('/crxl/qpp/comicCps/distributor/selectWitndrawals', params).then(res => res.data); };

export const getdistributors = params => { return axios.post('/crxl/qpp/comicCps/get/getAllDistributor', params).then(res => res.data); };

export const updatedistributor = params => { return axios.post('/crxl/qpp/comicCps/updateDistributor', params).then(res => res.data); };

export const balance = params => { return axios.post('/crxl/qpp/comicCps/finish/distributor/finishWitndrawals', params).then(res => res.data); };

export const getBeanOrders = params => { return axios.post('/crxl/qpp/comicCps/selectKakaBeanOrder', params).then(res => res.data); };

export const getCps = params => { return axios.post('/crxl/qpp/comicCps/getAllCpsAdmin', params).then(res => res.data); };

export const Untie = params => { return axios.post('/crxl/qpp/comicCps/bindingCpsAndDistributor', params).then(res => res.data); };

export const addDistributor = params => { return axios.post('/crxl/qpp/comicCps/addDistributor', params).then(res => res.data); };

export const updateDistributorstate = params => { return axios.post('/crxl/qpp/comicCps/updateDistributorState', params).then(res => res.data); };

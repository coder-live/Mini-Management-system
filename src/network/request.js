import axios from 'axios';
import {Loading,Message} from 'element-ui';

let loading;
//封装loading 开始
function startLoading() {
  loading= Loading.service({
    lock: true,
    text: '正在拼命加载中!!!'
  });
};
//loading结束
function endLoading() {
  loading.close();
};


export function request(config) {

  const instance1 = axios.create({});
  instance1.interceptors.request.use(
    config => {
      //console.log("拦截请求成功",config);
      startLoading();
      let token = window.localStorage.getItem('token');
      if( token ) {
        config.headers.Authorization= token
      }
      return config;
    },err => Promise.reject(err)
  )
  instance1.interceptors.response.use(
    res => {
      //console.log("拦截响应成功");
      endLoading();
      return res;
    },err => {
      endLoading();
      let status = err.response.status
      if( status === 401 ) {
        Message.error('token失效');
        window.localStorage.removeItem( 'token' );
        window.location.href = '/login'
        // this.$router.replace('/login');
      }
      Message.error(err.response.data)
      return Promise.reject(err);
    }
  )
  return instance1(config);
}
import Vue from 'vue';
import VueRouter from 'vue-router';
import {Message} from 'element-ui';
// import Index from '../views/index/Index';
//设置懒加载
const Index= () => import('@/views/index/Index');
const Home= () => import('@/views/index/indexChildren/Home');
const FundList= () => import('@/views/index/indexChildren/FundList');
const UserInfo= () => import('@/views/index/indexChildren/UserInfo');

const Register= () => import('@/views/register/Register');
const Login= () => import('@/views/login/Login');
const Nofound= () => import('@/views/404/404');
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/', redirect: 'home' },
        { path: 'home', name: 'home', component: Home },
        { path: 'fundList', name: 'fundList', component: FundList },
        { path: 'userInfo', name: 'userInfo', component: UserInfo },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notfound',
      component: Nofound
    },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];



const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach( (to,from,next) => {
  let hasToken = window.localStorage.getItem('token')
  if( to.path=='/login' || to.path=='/register' ) {
    next();
  }else if( hasToken ) {
    next();
    //console.log(hasToken)
  }else{
    //console.log(2)
    Message.info('请先登录');
    next('/login');
  }
} )

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
//引入组件 打包会打包在文件中，如果都用import的话，所有组件都会打包在一个文件中，导致文件较大
//@指从src开始
import Home from '@/views/home/Home.vue'
import {tokenInvalid} from '@/service/api'

//按需加载，访问路径的时候才会加载，不访问，不加载
const Know = () => import('@/views/driver/Know')
const Report = () => import('@/views/driver/Report')
const ReportDetail = () => import('@/views/driver/ReportDetail')
const BL = () => import('@/views/driver/BL')

const Setting = () => import('@/views/setting/index')
const Login = ()=>import('@/views/user-login/Login.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    title:'主页面',
    component: Home,
    meta:{
      login:true
    }
  },
  {
    path: '/setting',
    name: 'setting',
    title: '设置',
    component: Setting,
    meta: {
      login: true
    }
  },
  {
    path: '/know',
    name: 'know',
    title:'进厂须知',
    component: Know,
    meta: {
      login: true
    }
  },
  {
    path: '/report',
    name: 'report',
    title:'进厂报备',
    component: Report,
    meta: {
      login: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    title: '详情页',
    component: ReportDetail,
    meta: {
      login: true
    }
  },
  {
    path: '/bl',
    name: 'bl',
    title:'进厂须知',
    component: BL,
    meta: {
      login: true
    }
  },
  {
    path: '/login',
    name: 'login',
    title: '登录页',
    component: Login,
    meta: {
      login: true
    }
  },
  
  {
    path: '*',
    name: 'noFound',
    title: '未找到',
    redirect:{
      name:'login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const isLogin = !!token;

  // 进入路由的时候，都要向后端发送token,验证合法不合法
  // 不管路由需要不需要登录，都需要展示用户信息
  // 都需要向后端发请求，拿到用户信息
  if (to.matched.some(item => item.meta.login)) { //有一个需要登录，判断登录状态
    if(isLogin){//已经登录
      //如果token失效，移除token
      // if(token){
        //判断token是否失效
        tokenInvalid().then((data)=>{
          if(data.code==999){
            next({
              name: 'login'
            });
            //token失效 清除localstorage中是token
            localStorage.removeItem('token');
            return;
          }
        })
      // }

      if(to.name==='login'){
        next({name:'home'})
      }else{
        next();
      }
      return;
    }
    //没登录，进入login，直接进入
    if(!isLogin && to.name === 'login'){
      next();
    }
    //没登录，进入的不是login，跳到login
    if (!isLogin && to.name !== 'login'){
       next({
         name: 'login'
       });
    }
   
  }else{
    console.log('不需要登录');
    next(); //决定是否进入到路由
  }
  
})

export default router

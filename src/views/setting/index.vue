<template>
  <div class="setting">
    <van-nav-bar
        title="设置"
        left-arrow
        @click-left="onClickLeft"/>
    <van-cell-group>
      <van-cell title="个人信息" is-link @click="seeUserInfo"/>
      <van-cell title="密码设置" is-link @click="onPasswordSet"/>
      <van-cell title="退出登录" @click="onSignOut"/>
    </van-cell-group>
  </div>
</template>
<script>
import {NavBar,Toast,Cell,CellGroup} from 'vant'

export default {
  components:{
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
  },
  methods: {
    onClickLeft(){
      Toast('返回主页面');
      this.$router.push({path:'/'});
    },
    //个人信息（可以用动态组件-状态的保持，来处理切换，而不是用路由————代表一种独立的页面）
    seeUserInfo(){},
    //密码设置
    onPasswordSet(){

    },
    // 退出登录
    onSignOut(){
      //清空locakstorge中的token
      localStorage.removeItem('token');
      //跳到登录页面
      this.$router.push({path:'/login'});
    }
  },
}
</script>
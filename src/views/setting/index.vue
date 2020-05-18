<template>
  <div class="setting">
    <van-nav-bar
        title="设置"
        left-arrow
        @click-left="onClickLeft"/>
    <van-cell-group>
      <van-cell title="个人信息" is-link />
      <van-cell title="密码设置" is-link />
      <van-cell title="退出登录"/>
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
    }
  },
}
</script>
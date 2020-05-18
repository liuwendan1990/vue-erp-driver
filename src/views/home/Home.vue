<template>
  <div class="home">
    <van-nav-bar left-text="娲石司机">
      <template #right>
        <router-link :to="{name:'setting'}">
          <van-icon name="setting-o" size="20"/>
        </router-link>
      </template>
    </van-nav-bar>
    <van-grid clickable :column-num="3" icon-size="45">
      <van-grid-item icon="notes-o" text="进厂须知" to="/know"/>
      <van-grid-item icon="logistics" text="进厂报备" to="/report" />
      <van-grid-item icon="shopping-cart-o" text="提货单" to="/bl" />
    </van-grid>
  </div>
</template>

<script>
import { NavBar, Toast, Icon, Grid, GridItem } from 'vant'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  
  data() {
    return {
      pageLinks:[
        {
          id:1,
          routerName:'know',
          pageLink:'',
          pageImg:''
        },
        {
          id:2,
          routerName:'report',
          pageUrl:'',
          pageImg:''
        },
        {
          id:3,
          routerName:'bl',
          pageUrl:'',
          pageImg:''
        }
      ]
    }
  },

  methods: {
    onClickRight() {
      Toast('按钮');
    },
  },
}
</script>


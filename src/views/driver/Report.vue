<template>
  <div class="report">
    <van-nav-bar
        fixed
        title="进厂报备"
        left-arrow
        @click-left="onClickLeft"/>
    <div class="content">
      <van-tabs type="card" v-model="activeName" @click="onTabsChange">
        <van-tab title="提货车辆" name="saleOrder">
          <router-link :to="{name:'detail'}" v-for="item in saleOrderList" :key="item.id">
            <div class="panel-card">
              <ul class="panel-table-view">
                  <li class="panel-table-view-cell"><span class="list-label">订单编号</span><span
                          class="list-con">{{item.no}}</span>
                  </li>
                  <li class="panel-table-view-cell"><span class="list-label">货物名称</span><span
                          class="list-con">{{item.productName}}</span></li>
                  <li class="panel-table-view-cell"><span class="list-label">发货单位</span><span
                          class="list-con">{{item.deliveryOffice}}</span></li>
                  <li class="panel-table-view-cell"><span class="list-label">收货地点</span><span
                          class="list-con">{{item.deliveyArea}}</span></li>
              </ul>
            </div>
          </router-link>
          
        </van-tab>
        <van-tab title="送货车辆" name="purchaseOrder">
          <router-link :to="{name:'detail'}" v-for="item in purchaseOrderList" :key="item.id">
            <div class="panel-card">
              <ul class="panel-table-view">
                  <li class="panel-table-view-cell"><span class="list-label">任务单号</span><span
                          class="list-con">{{item.no}}</span>
                  </li>
                  <li class="panel-table-view-cell"><span class="list-label">物料名称</span><span
                          class="list-con">{{item.goodsName}}</span></li>
                  <li class="panel-table-view-cell"><span class="list-label">发货单位</span><span
                          class="list-con">{{item.deliveryOffice}}</span></li>
                  <li class="panel-table-view-cell"><span class="list-label">收货单位</span><span
                          class="list-con">{{item.receiveOffice}}</span></li>
              </ul>
            </div>
          </router-link>
        </van-tab>
      </van-tabs>
      
    </div>
  </div>
</template>
<script>
import {getSaleOrderUnreport,getPurchaseOrderUnreport} from '@/service/api'
import { NavBar, Toast, Tab, Tabs } from 'vant'
export default {
    name: 'Report',
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
    },
    data() {
      return {
        activeName:'saleOrder',
        saleOrderList:[],
        purchaseOrderList:[],
      }
    },
    methods: {
        onClickLeft() {
            this.$router.push({path:'/'});
        },
        /**
         * 1、将服务端返回数据，转换成前端需要的格式
         * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
         * convert对应销售订单、convert2对应采购订单
         * @param {Array} items 
        */
        convertServeData(type,items) {
            var newItems = [];
            if(type=="saleOrder"){
              items.forEach(function(item) {
                newItems.push({
                    id:item.id,
                    no: item.no,
                    productName: item.productName,
                    deliveryOffice: item.deliveryOffice,
                    deliveyArea:item.deliveryPlaceArea+item.deliveryPlaceAddress//收货地点
                });
            });
            }else if(type=='purchaseOrder'){
              items.forEach(function(item) {
                  newItems.push({
                      id:item.id,
                      no: item.no,
                      goodsName: item.goodsName,
                      deliveryOffice: item.deliveryOffice,
                      receiveOffice: item.receiveOffice,
                  });
              });
            }
            
            return newItems;
        },
        onTabsChange(name) {
          // console.log(name,title);
          if(name=='saleOrder'){
             getSaleOrderUnreport().then((data)=>{
              if(data.code===0){
                this.saleOrderList=this.convertServeData('saleOrder',data.data);
              }
            })
          }else if(name=='purchaseOrder'){
            getPurchaseOrderUnreport().then((data)=>{
              this.saleOrderList=this.convertServeData('purchaseOrder',data.data);
            })
          }
          Toast('请选择你要报备的任务单');
        }
    },
    created() {
      //请求页面数据
      getSaleOrderUnreport().then((data)=>{
        if(data.code===0){
          this.saleOrderList=this.convertServeData('saleOrder',data.data);
          Toast('请选择你要报备的任务单');
        }
      })
     
    },
    mounted() {
      //初始化页面数据

    },
}
</script>
<style>
    .report a {
      color:#000;
    }
    .report .van-tabs {
        margin-top: 10px;
    }
    .report .van-tabs__nav{
      background: none;
    }
    
    .report .van-tabs__nav--card{
      border: 1px solid #007aff;
    }

    .report .van-tabs__nav--card .van-tab {
        color: #007aff;
        border-right: 1px solid #007aff;
    }
    .report .van-tabs__nav--card .van-tab:last-child {
        border-right: none;
    }
    .report .van-tabs__nav--card .van-tab.van-tab--active {
        color: #fff;
        background-color: #007aff;
    }
    /* .report .van-tabs__content{
      position: absolute;
    } */
</style>
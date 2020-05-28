<template>
  <div class="know">
    <van-nav-bar
        fixed
        title="进厂须知"
        left-arrow
        @click-left="onClickLeft"/>
    <div class="content">
        <div class="panel-card">
            <h3>
                车辆及人员进入娲石水泥厂送提货安全须知
            </h3>
            <p>
                &gt;所有提、送货车辆登记：司机需携带有效证件到门卫登记方能进入普通车登记需要：《机动车行驶证》《机动车驾驶证》；
            </p>
            <p>
                &gt;车辆驾驶室应确保整洁无杂物，如不符合要求的须清洁后方能进入；
            </p>
            <p>
                &gt;进入厂区后车辆速度不得超过10KM，如违反第一次警告处理，再次违反该车辆和司机将被禁止再次进入厂区；
            </p>
            <p>
                &gt;进入厂区后，司机在驾驶时严禁接打电话；如确实紧急需要打电话的，应该停在路边确保安全的情况后方能接打电话；
            </p>
            <p>
                &gt;在卸货时，送货司机必须配合将货车钥匙交予仓库人员保管，等卸完货后再去领取；
            </p>
            <p>
                &gt;进入厂区的货车只允许装载送至娲石水泥厂的产品，如车上有其他客户的物料的将不被放行进入厂区；
            </p>
            <p>
                &gt;车辆及人员进入厂区后应听从安保部门指挥，不得在厂区内随意走动。
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Toast } from 'vant'

export default {
    name: 'Know',
    components: {
        [NavBar.name]: NavBar,
        [Toast.name]: Toast,
        // [Panel.name]: Panel,
    },
    methods: {
        onClickLeft() {
            Toast('返回主页面');
            this.$router.push({path:'/'});
        }
    },
}
 
</script>

<style scoped>
    
    .know .panel-card {
        padding: 10px;
    }
    
     .know .panel-card h3 {text-align: center;font-weight: bold;}
     .know .panel-card p { margin: 12px 0;}
</style>
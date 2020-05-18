<template>
    <div class="login">
       <van-nav-bar
        title="登录"
        />
        <van-form @submit="onSubmit">
            <van-field
                v-model="phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
            />
            
            <div class="code" v-if="flag">
                <van-field
                    v-model="code"
                    type="text"
                    name="code"
                    label="验证码"
                    placeholder="验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]"
                />
                 <van-tag ref="countDown" type="primary" @click="getCode">
                     获取验证码
                    <!-- <van-count-down 
                        ref="countDown"
                        :time="time" 
                        :auto-start="false"
                        format="ss秒" 
                        @finish="finish"/> -->
                 </van-tag>
            </div>
            <div v-else>
                <van-field 
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
            </div>
            <div id="loginSwitch" @click="onLoginSwitch">
                <a v-if="flag">密码登陆</a>
                <a v-else>验证码登陆</a>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { login, password_login, getLoginCode} from '@/service/api'
// import { NavBar, Form, Field, Button, Toast, Tag, CountDown } from 'vant'
import { NavBar, Form, Field, Button, Toast, Tag } from 'vant'

export default {
    name:'Login',
    components:{
        [NavBar.name]:NavBar,
        [Form.name]:Form,
        [Field.name]:Field,
        [Button.name]:Button,
        [Toast.name]:Toast,
        [Tag.name]:Tag,
        // [CountDown.name]:CountDown
    },
    data() {
        return {
            phone: '',
            code:'',
            password: '',
            flag:true,
            timer:null,//定时器名称
            timerNum:60//设置定时器时间
        };
    },
    methods: {
        //登录
        onSubmit(values) {
            console.log('submit', values);
            //这里做一下格式校验
            //在这里向后端发送登录手机号和密码
            if(this.flag){//验证码登录
                login({
                    phone:values.phone,
                    code:values.code
                }).then((data)=>{
                    console.log(data);
                    if(data.code===0){//成功
                        //存储token
                        localStorage.setItem('token',data.data.token);
                        window.location.href='/';
                    }
                    if(data.code===1){
                        Toast(data.msg);
                    }
                });
                return;
            }
            password_login({
                phone:values.phone,
                password:values.password
            }).then((data)=>{
                console.log(data);
                if(data.code===0){//成功
                    //存储token
                    localStorage.setItem('token',data.data.token);
                    window.location.href='/';
                }
                if(data.code===1){
                    Toast(data.msg);
                }
            })
        },
        //登录方式切换
        onLoginSwitch(){
            this.flag=!this.flag;
        },
        //获取验证码
        getCode(){
            //判断手机号码格式是否正确
            getLoginCode({
                phone:this.phone
            }).then((data)=>{
                if(data.code===0){
                    //获取验证码成功，开始倒计时，60s后允许重新获取验证码
                    this.loading();
                    this.timer = setInterval(() => {
                        if(this.timerNum === 0){
                            //60s后允许重新获取验证码
                            this.timer&&this.clearTimer(this.timer);//关闭定时器

                            
                        }else{
                            this.loading();
                            // this.timerNum--;
                            // this.$refs.countDown.innerHTML=this.timerNum+'秒';
                            // this.$refs.countDown.style.backgroundColor='#eee';
                        }
                       
                    }, 1000);
                }
                if(data.code===1){
                    Toast(data.msg);
                }
            })
        },
        loading() { // 启动定时器
            this.timerNum--; // 定时器减1
            this.$refs.countDown.innerHTML=this.timerNum+'秒';
            this.$refs.countDown.style.backgroundColor='#eee';
        },
        clearTimer() {//清除定时器
            clearInterval(this.timer);
            this.timer = null;
            this.timerNum = 60;
            this.$refs.countDown.innerHTML='获取验证码';
            this.$refs.countDown.style.backgroundColor='#007aff';
        }
    },
    //最后在beforeDestroy()生命周期内清除定时器
    beforeDestroy() {
        this.clearTimer();
    },
        
    
}
</script>

<style>
.login .van-nav-bar {
    background-color: #1989fa;
}
.login .van-nav-bar__title {
     color: #fff;
}
/* 获取验证码样式 */
.code {
    position: relative;
}
.code .van-tag {
    position: absolute;
    top:10px;
    right:16px;
}
#loginSwitch {
    padding: 10px 16px;
}
#loginSwitch a{
    color: #1989fa;
}
</style>
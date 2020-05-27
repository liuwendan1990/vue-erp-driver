<template>
    <div class="login">
       <van-nav-bar
        title="登录"
        />
        <van-cell-group>
            <!-- 输入手机号，调起手机号键盘 -->
            <van-field
                v-model="ruleForm.phone"
                type="tel"
                name="phone"
                clearable
                label="手机号"
                placeholder="请输入手机号"
                :rules="rules.phone"
            />
            <!-- 允许输入数字，调起带符号的纯数字键盘 -->
            <div class="code" v-show="flag">
                <van-field
                    v-model="ruleForm.code"
                    type="number"
                    name="code"
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    :rules="rules.code"
                >
                    <template #button>
                        <van-button ref="countDown" native-type="button" size="small" type="info" @click="getCode">发送验证码</van-button>
                    </template>
                </van-field>
                <!-- <van-tag ref="countDown" type="primary" size="large" @click="getCode">
                     获取验证码
                </van-tag> -->
               
            </div>
            <div v-show="!flag">
                <van-field 
                    v-model="ruleForm.password"
                    type="password"
                    name="password"
                    clearable
                    label="密码"
                    placeholder="请输入密码"
                    :rules="rules.password"
                />
            </div>
            <div id="loginSwitch" @click="onLoginSwitch">
                <a v-if="flag">密码登陆</a>
                <a v-else>验证码登陆</a>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" @click="onSubmit">
                    登录
                </van-button>
            </div>
        </van-cell-group>
    </div>
</template>
<script>
import { login, password_login, getLoginCode} from '@/service/api'
// import { NavBar, Form, Field, Button, Toast, Tag, CountDown } from 'vant'
import { NavBar, Form, Field, Button, Toast, Tag, CellGroup  } from 'vant'

export default {
    name:'Login',
    components:{
        [NavBar.name]:NavBar,
        [Form.name]:Form,
        [Field.name]:Field,
        [Button.name]:Button,
        [Toast.name]:Toast,
        [Tag.name]:Tag,
        [CellGroup.name]:CellGroup 
    },
    data() {
        return {
            flag:true,//判断是哪种方式登录
            ruleForm: {
                phone: '',//手机号码
                code:'',//验证码
                password: '',//密码
            },
           rules: {
                phone: [
                        { required: true, message: '请填写手机号' },
                        { pattern:/^0?(1)[0-9]{10}$/,message:'请输入正确格式手机号'}
                    ],
                password: [
                        { required: true, message: '请填写密码' },
                        { pattern:/^\d{6}$/,message:'请输入6位数字'}
                     ],
                code: [
                        { required: true, message: '请填写验证码' },
                        // { pattern:/^\d{4}$/,  message: '请输入4位有效数字'}
                    ]
            },
            
            timer:null,//定时器名称
            timerNum:60//设置定时器时间
        };
    },
    methods: {
        // 校验函数返回 true 表示校验通过，false 表示不通过
        validator(val) {
            return /^\d{4}$/.test(val);
        },
        //登录
        onSubmit() {
            console.log('进来了------');
           
            //这里做一下格式校验
            //在这里向后端发送登录手机号和密码
            if(this.flag){//验证码登录
                if(!/^\d{4}$/.test(this.ruleForm.code)){
                    Toast('请输入4位有效数字');
                    return;
                }
                login({
                    phone:this.ruleForm.phone,
                    code:this.ruleForm.code
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
                phone:this.ruleForm.phone,
                password:this.ruleForm.password
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
           
            // if(validator){

            // }
            // this.$refs.ruleForm.validate(async (valid) => {

                // if(!valid){return}

                //判断是否输入正确格式的手机号码
                // /^\d{4}$/.test(val)
                if(this.ruleForm.phone==''){
                    Toast('手机号不能为空');
                    return ;
                }
                // if(/^0?(1)[0-9]{10}$/.test(this.ruleForm.phone)==false){
                //     Toast('请输入正确格式的手机号');
                //     return;
                // }
                getLoginCode({
                    phone:this.ruleForm.phone
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
                            }
                        
                        }, 1000);
                    }
                    if(data.code===1){
                        Toast(data.msg);
                    }
                });
            // });
        },
        loading() { // 启动定时器
            this.timerNum--; // 定时器减1
            this.$refs.countDown.innerHTML=this.timerNum+'秒后重试';
            this.$refs.countDown.style.backgroundColor='#969799';
        },
        clearTimer() {//清除定时器
            clearInterval(this.timer);
            this.timer = null;
            this.timerNum = 60;
            this.$refs.countDown.innerHTML='发送验证码';
            this.$refs.countDown.style.backgroundColor='#1989fa';
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

#loginSwitch {
    width: 70px;
    padding: 10px 16px;
}
#loginSwitch a{
    color: #1989fa;
    font-size: 14px;
}
</style>
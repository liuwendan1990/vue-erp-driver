<template>
    <div class="login">
        <van-form @submit="onSubmit">
            <van-field
                v-model="phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import {login} from '@/service/api'
import { Form, Field, Button, Toast } from 'vant'

export default {
    name:'Login',
    components:{
        [Form.name]:Form,
        [Field.name]:Field,
        [Button.name]:Button,
        [Toast.name]:Toast
    },
    data() {
        return {
            phone: '',
            password: '',
        };
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values);
            //这里做一下格式校验
            //在这里向后端发送登录手机号和密码
            login({
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
    },
        
    
}
</script>
import axios from 'axios';
import Qs from 'qs';
import {Toast} from 'vant';
class HttpRequest {
    constructor(options) {
        this.defaults = {
            baseUrl: ''
        }
        this.defaults = Object.assign(this.defaults, options);
    }
    setConfig() {

    }
    interceptors(install) {
        //设置post请求头 默认配置（ 根据实际项目需求配置）
        //install.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        //添加request拦截器
        install.interceptors.request.use(
            config => {
                //在请求之前做些什么（加载提示）
                //打开loading
                Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                let token = localStorage.getItem('token');
                if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                    config.headers.token = `${token}`;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        //添加response拦截器
        install.interceptors.response.use(
            //请求成功
            res => {
                // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
                //合并loading请求效果 避免重复请求
                setTimeout(() => {
                    Toast.clear();
                }, 200);

                const {
                    data,
                    status
                } = res;
                console.log(res, status);
                return data;
            },
            err => {
                // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
                //合并loading请求效果 避免重复请求
                setTimeout(() => {
                    Toast.clear();
                }, 100);

                if(err.response){
                    switch (err.response.status) {
                        case 401:
                            console.log(401);
                            break;
                        case 403:
                            console.log(403);
                        break;
                        case 404:
                            console.log(404);
                        break;
                        case 500:
                            console.log(500);
                        break;
                    }
                }
                Toast('请求失败！');
                return Promise.reject(err);
            }
        );
    }
    request(options) {
        options = Object.assign(this.defaults, options)
        const instance = axios.create(options)
        this.interceptors(instance);
        return instance
    }
}

const request = new HttpRequest({
    baseURL: '/api'
});

const http = request.request();

/**
 * token是否失效校验
 * @export
 * @param {Object} params 
 * @param {string} params.token - token  请求头里面
 * @returns
 */
export async function tokenInvalid() {
    return await http.post('/erp-api/common/checkToken');
}

/**
 * 密码登录
 * @export
 * @param {Object} params 
 * @param {string} params.phone - 手机号
 * @param {string} params.password - 密码
 * @returns
 */
export async function password_login(params) {
    //传入数据类型为FormData
    params = Qs.stringify({
        ...params
    });
    return await http.post('/erp-api/driver/password_login', params, {
    'Content-Type': 'application/x-www-form-unlencoded'
    });
}

/**
 * 验证码登录
 * @export
 * @param {Object} params  
 * @param {string} params.phone - 手机号
 * @param {string} params.code - 验证码
 * @returns
 */
export async function login(params) {
    //传入数据类型为FormData
    params = Qs.stringify({
        ...params
    });
    return await http.post('/erp-api/driver/login', params, {
        'Content-Type': 'application/x-www-form-unlencoded'
    });
}

/**
 * 验证码登录
 * @export
 * @param {string} params.phone - 手机号
 * @returns
 */
export async function getLoginCode(params) {
    //传入数据类型为FormData
    params = Qs.stringify({
        ...params
    });
    return await http.post('/erp-api/driver/getLoginCode', params, {
        'Content-Type': 'application/x-www-form-unlencoded'
    });
}

/**
 * 获取用户信息
 * @export
 * @param {Object} params - 
 * @param {string} [params.userId] - 用户id
 * @returns
 */
// export async function userInfo(params) {
//     return await http.post('/user/info', params);
// }

/**
 * 司机获取未报备且车运的销售单
 * @export 参数token在请求头里面
 * @returns
 */
export async function getSaleOrderUnreport() {
    return await http.post('/erp-api/sales/order/unreport');
}

/**
 * 司机获取未报备且车运的采购单
 * @export 参数token在请求头里面
 * @returns
 */
export async function getPurchaseOrderUnreport() {
    return await http.post('/erp-api/purchase/task/order/car/unreport');
}
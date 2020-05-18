// vue.config.js
// webpack开发者自己写的配置，vue-cli会把开发者写的配置合并到内置的webpack配置中。 
module.exports = {
    //部署应用时的基本URL
    //publicPath: process.env.NODE_ENV === 'production' ? '39.105.21.139:8899':'61.183.87.118:8899',
    publicPath: '/', //publicPath取代了baseUrl
    devServer: {
        open:true,//配置自动启动浏览器
        proxy: {
            '/api': { // http://localhost:8080/api/erp-api/driver/password_login
                target: 'http://39.105.21.139:8899', //源地址 http://39.105.21.139:8899/erp-api/driver/password_login
                changeOrigin: true,//改变源
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
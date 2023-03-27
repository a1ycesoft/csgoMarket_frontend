const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/buff': {
        target: 'https://buff.163.com',//这里填入你要请求的接口的前缀
        ws: true,//代理websocked
        changeOrigin: true,//虚拟的站点需要更管origin
        secure: true,                   //是否https接口
        pathRewrite: {
          '^/buff': ''//重写路径
        }
      },
      '/myapi': {
        target: 'http://localhost:9090',//这里填入你要请求的接口的前缀
        ws: true,//代理websocked
        changeOrigin: true,//虚拟的站点需要更管origin
        secure: true,                   //是否https接口
        pathRewrite: {
          '^/myapi': ''//重写路径
        }
      }
    }
  }
})

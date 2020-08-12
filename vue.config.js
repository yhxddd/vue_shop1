module.export = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production',
      config => {
      //  产品发布的打包入口文件
        config
          .entry('app')
          .clear()
          .add('./src/main-prod.js')
        config.set('externals', {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          lodash: '_',
          echarts: 'echarts',
          nprogress: 'NProgress',
          'vue-quill-editor': 'VueQuillEditor'
        })
      })

    config.when(process.env.NODE_ENV === 'development',
      config => {
      //  产品开发的打包入口文件
        config
          .entry('app')
          .clear()
          .add('./src/main.js')
      })
  }
}

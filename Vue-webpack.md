##脚手架
- vue init <template name> <project name>
- vue init <git repo> <project name>

### 项目结构
  - build
    - 打包相关
  - config
    - 配置文件
    - Vue-load
    - webpack.dev.conf
      - 生产环境
    - webpack.base.confjs 供给dev prod test
      - path
      - out
  - src
    - App.Vue (根文件) 用来挂载根节点
    ```html
    <template>
      <div id="app">
        {{text}}
      </div>
      </template>

      <script>
      export default {
      name: 'App',
      data () {
        return {
          text: 'this is test'
        }
      }
      }
      </script>

      <style scoped>
      #app {
        color: red;
      }
      </style>
    ```
    - App.Vue (根文件)
      ```js
      import Vue from 'vue'
      import App from './app.vue'
      const root = document.createElement('div')
      document.body.appendChild(root)

      new Vue({
      render: (h) => h(App)
      }).$mount(root)
      ```
    - webpack.config.js
    - package.json
  - static
    - 不需要经过webpack处理的文件
  - test
    - 测试相关
  - package.json
    - npm run dev  

### 配置文件

#### package.json 的配置
  - package.json的配置主要是script脚本命令的配置
    - build 命令 "build": "cross-env NODE_ENV=production webpack --mode=production --config webpack.config.js",
    - dev命令 "dev": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config webpack.config.js"
      - cross-env 是使用webpack-dev-server的一个依赖，主要处理兼任问题
      - NODE_ENV --mode 用来区分是本地生产环境还是开发环境, webpack4新增--mode参数，webpack3 使用的是cross-env的NODE_ENV变量记载。
      - --config指向webpack的config文件

#### webpack.config.js的配置
  - 首先是入口文件和出口文件的配置
    - entry 是src下的index.js  ,  output 是新建的dist文件夹
    ```js
    const path = require('path')
      module.exports = {
      entry: path.join(__dirname, 'src/main.js'),
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
      }
      }
    ```
    - webpack4 需要npm i webpack-cli
  - module 的rules配置，对不同的文件如.js,.css.,.stly,.png ...文件配置不同的loader
      - npm i style-loader vue-loader stylus stylus-loader url-loader file-loader
      - 各种loader的配置官方文档里有，另外 styl的test 要写成test:/\.styl(us)?$/, 否则无法解析vue文件里的stylus
      - .vue 文件的 webpack4中 vue-loader需要以插件的形式引入
       ```js
        const VueLoaderPlugin = require('vue-loader/lib/plugin')
        //输出配置里的plugins
        plugins: [
          new VueLoaderPlugin()
        ]
       ```
  - 引入 HTMLPlugin插件来做html的展示    
    - npm i html-webpack-plugin
    ```js
    const HTMLPlugin = require('html-webpack-plugin')
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
          }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
      ],
    ```
  - dev-server
    - npm i cross-env
    - 在webpack.config.js里定义isDev变量来区分生产环境和开发环境
      ``` `js
      const isDev = process.env.NODE_ENV === 'development'
      if (isDev) {
        config.devtool = '#cheap-module-eval-source-map',
        config.devServer = {
          port: 8000,
          host: '0.0.0.0',
          overlay: {
            errors: true
          //热加载
          hot: true
        },
        //下面是不刷新更新内容
        config.plugins.push(
          new webpack.HotModuleReplacementPlugin(),,
          new webpack.NoEmitOnErrorsPlugin()
        )
      }
      ```
  - postCss
  - babel-loader

#### 优化
##### css的单独打包
> webpack按上述方式打包，形成的是一个js文件和一个html文件，css以字符串的形式保存在js文件中，我们需要把它单独划分出来，在html中以style的方式引入

  - npm install extract-text-webpack-plugin@next
  - 对css进行开发环境和线上运行环境的区分

#### vue文件的单独打包
```js
config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }

config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
```
### 工具配置

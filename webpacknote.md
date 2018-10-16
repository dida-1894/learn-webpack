# 模块化开发
## JS的模块化
- 命名空间
  > 库名.类名.方法名

- CommonJS
  - 使用于node服务器端
  - 一个文件为一个模块 module.exports 暴露模块接口
  - 通过 require 引入模块 两者同步执行
- AMD/CMD/UMD规范
  - Async Module Definition
  > - 使用define 定义模块
  > - 使用require 加载模块
  > RequireJS 依赖前置，提前执行

  - Common Module Definition
   > 一个文件一个模块 define require
   > SeaJS 尽可能的懒执行

   - Universal
     - 通用解决方案
     - 判断是否支持 AMD -> CommonJS
     - 定义为全局变量
- ES6 module
  - 一个文件一个模块
  - export/import
- webpack 支持
  - AMD(RequireJS)
  - ES Module(推荐)
  - CommonJS
## css的模块化
### css设计模式
 - OOCSS
  - 面向对象的css
 - SMACSS
   - 可扩展和模块化结构
 - AMCSS
   - 原子化，基于功能小的，每一个原子
 - BEM
   - Block Element Modifier
 - MCSS

# newcomer
新人培训 (零基础培训)

**说明 关于可选或选读, 导师可以根据新人能力, 推荐阅读**

#### CSS基础

**适当的讲一下, 但不要过多的占用自己时间, 最终目的, 独立完成UX设计稿到静态HTML页面转换(PSD2HTML)**

1. 如何使用 webstorm ( 强调快捷键使用 )
2. 熟悉 html 页面结构 ( 强调 doctype ), 写一个人简历页面, 不要用 CSS 样式, [html规范](https://gist.github.com/hjzheng/e3a1fadb3ef7df69ecef)
3. 使用Chrome dev tools 调试 CSS, HTML
4. 使用 JSBin 写自己的 demo 页面
5. reset.css 例如 normalize.css (为什么会有rest.css 和 浏览器的差异性)
6. 盒模型
7. CSS Layout 一些知识 http://zh.learnlayout.com/
    - block, inline 和 inline-block 元素特点 [传送门](http://zhenghaoju700.blog.163.com/blog/static/1358595182014542594926/)
    - 浮动布局 和 清理浮动 [传送门](http://zhenghaoju700.blog.163.com/blog/static/1358595182014583144423/)
    - 定位布局 [传送门](http://zhenghaoju700.blog.163.com/blog/static/13585951820145109128773/)
    - flex布局(可选) [传送门](https://gist.github.com/hjzheng/eb21c393a320391dcf63)
    - box-sizing
    - 垂直居中 [传送门](http://mossad.iteye.com/blog/2153675)
8. CSS 样式优先级 和 CSS 选择器 (这个 w3cschool 上有, 取决于新人自学程度) [传送门](http://zhenghaoju700.blog.163.com/blog/static/135859518201342883431872/)
9. 一些常见的组件的写法, 例如导航栏, 登录页面, 菜单, 商品展示等, 可以参考京东或天猫首页, 重点在于HTML结构选择
10. 工作流(从原型到html页面(PSD2HTML), 随便截取一张网页的一部分, 让新人实现, 导师可以进行示范)
    - 拿到设计稿, 分析结构, 标注
    - 先写出HTML结构
    - 在添加上CSS样式
    - 最终效果与设计稿一致
11. CSS3 和 HTML5 (可选)
12. CSS框架 bootstrap (可选)
13. [精通CSS 高级Web标准解决方案](https://book.douban.com/subject/4736167/) (可选)
14. CSS规范 http://codeguide.bootcss.com/

#### JS基础 (ES5)

**以自学为主, 有问题问导师, 独自完成练习, 导师可以带着做一个简单的练习**

1. 语法: 标识符, 数字, 字符串, 语句, 表达式, 字面量, 函数
2. 对象, 函数, 继承, 数组, 正则, 闭包, 原型继承, 立即自执行函数
    - [codecademy.com Javascript 练习](https://www.codecademy.com/learn/javascript) (可选)
    - [NodeSchool JS教程](https://github.com/sethvincent/javascripting) (可选)
3. 函数的四种调用模式 (重点介绍) 前3点都可以参考 [JavaScript语言精髓](http://item.jd.com/11090963.html) (选读)
4. DOM, BOM 和 Ajax请求
5. [JavaScript模式](http://item.jd.com/11044070.html) (选读)
6. [JavaScript DOM高级程序设计](http://item.jd.com/10138651.html) (选读)
7. JS规范 [ESLint规范](https://github.com/Jocs/ESLint_docs)
8. 练习
    - Tab http://www.angularjs.cn/
    - Todo List AngularJS官网的Todo List, 用原生JS写 https://angularjs.org/
    - login http://www.angularjs.cn/login


#### AngularJS

**以自学为主, 有问题问导师, 独自完成练习**

1. AngularJS官方指南 https://docs.angularjs.org/guide
2. PhoneCat https://docs.angularjs.org/tutorial
3. [精通AngularJS](http://www.duokan.com/book/90947) (选读)
4. [A Better Way to Learn AngularJS](https://thinkster.io/a-better-way-to-learn-angularjs) 可以作为[AngularJS1.x知识的考察点](https://github.com/hjzheng/newcomer/blob/master/src/xmind/AngularJS1.x%20%E6%8A%80%E8%83%BD%E7%82%B9.png)
5. AngularJS 1.x 规范 参考 [johnpapa/angular-styleguide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md)
6. 练习
   - Todo list
   - 写一个指令 Tabs
   - 饿了吗页面

#### ES6

**实际项目中会用到ES6, 这里提供两个练习环境**

   - [babelify + browserify + gulp](https://github.com/hjzheng/es6-practice)
   - [babel + webpack](https://github.com/hjzheng/es6-practice-webpack)

1. [阮一峰的 ES6入门](http://es6.ruanyifeng.com/)
2. 关于 ES6 与 AngularJS 1.x 如何结合使用
   - 参考[ccms-components](https://github.com/ShuyunFF2E/ccms-components)
   - [Angular 1.x和ES6的结合](https://github.com/xufei/blog/issues/29)
3. [ESLint规范](https://github.com/Jocs/ESLint_docs)


#### 补充资料

- [PSD2HTML - Day 1](http://designmodo.com/create-website-day-1/)
- [PSD2HTML - Day 2](http://designmodo.com/create-website-day-2/)
- [PSD2HTML - Day 3](http://designmodo.com/create-website-day-3/)

#### 计划变更

- 对于技术优秀的实习生, 可以直接通过练习, 检测其水平, 水平合格者, 可以直接跳过相应的阶段.
- 初学者, 关于JS学习过程, 犀牛书过于理论化, 建议换用其他书作为入门教材.
    - JS入门 http://www.imooc.com/learn/36
    - JS高级 http://www.imooc.com/learn/10
    - Ajax http://www.imooc.com/learn/250

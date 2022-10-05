框架名称：FFDW（Furious Flaming Dragon Warrior）

框架中文名：狂怒喷火龙战士

框架语言：node.js

当前版本：0.1

框架优势：代码少

开源说明：可以随意使用，转载请署名

***
#### 框架介绍
基于node.js的web框架，仅支持GET请求，类似php的文件结构，MD我也说不清楚了，自己看代码吧

#### 快速入门：

源码架构：
main.js 框架入口
function 存储业务代码的文件夹
function / index.js 业务示例代码

***

食用方法：把index.js文件放到function文件夹下，function文件夹与main.js位于同目录，使用node.js运行main.js，框架即开始运行。

函数介绍：
所有业务代码都放置于function文件夹下，function文件夹就相当于网站根目录，一个js文件代表一个功能，例如你的服务运行在：http://127.0.0.1:8080/ ，用户访问http://127.0.0.1:8080/ 时框架就会自动引用function文件夹下的index.js文件，用户访问http://127.0.0.1:8080/user/login ，框架就会自动引用function/user/login.js文件，在对应js里面写入对应业务代码即可。
业务代码参考index.js文件。
```
function main($_GET,$_HEADERS,$_RESPONSE){
    let resp = {
        //定义返回代码和headers
        code:'200',
        header:{'Content-Type': 'text/html;charset=utf8'},
        res:'Requests Done'
    }
    //--------------------------------
    //下方是业务代码
    resp.res = 'Hello '+$_GET['name']+'!';
    //--------------------------------
    $_RESPONSE.writeHead(resp.code, resp.header);
    $_RESPONSE.end(resp.res);
    //返回处理结果
    return;
}
```
main函数为主函数，他的三个参数，$_GET参数与php中使用方法是一致的，为关联数组，可以用于获取用户在url中传递的GET参数，$_HEADERS参数为关联数组，内部包含useragent和cookie等，$_RESPONSE用于响应客户端请求，因为node.js是异步开发，所以如果要在业务代码里面进行网络、文件操作，注意调整$_RESPONSE的调用时机，防止服务器无响应或者返回错误内容。
resp数组包含返回代码、headers和正文内容，在处理业务时修改resp数组内的三个键值即可。
下面展示一下代码运行效果：

![image](https://img1.16q.cn/8a1ebf744c82b1bc8cd18d24107d4080)

***
好了，介绍完毕

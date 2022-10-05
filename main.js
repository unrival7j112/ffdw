/*
    @authorName : unrival
    @createTime : 2022-10-5
    @description : http服务器入口
    @version : 0.1
*/
'use strict';
function GetRequest(query) {
    //此函数把url中包含的参数解析为关联数组
    if(query==null){
        return [];
    }
    let theRequest = new Object(),
        strs = query.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
    return theRequest;
}
var http = require('http'),
    urlparse = require('url'),
    defaultHeaders = {'Content-Type': 'text/html;charset=utf8'},
    //定义http，url解析和默认返回头
    server = http.createServer(function (request, response) {
        //定义http服务器
        if(request.method!=='GET'){
            //如果请求不是GET请求就拒绝
            response.writeHead(405, defaultHeaders);
            response.end('Method Not Allowed');
            return;
        }
        let url = request.url,
            headers = request.headers,
            parse = urlparse.parse(url),
            path = parse['pathname'],
            query = parse['query'],
            $_GET = GetRequest(query);//$_GET即为客户端传递的参数
        if(path.slice(path.length)=='/'){
            //如果用户请求目录就定义为目录下的index函数
            path += 'index';
        }
        try{
            delete require.cache[require.resolve('./function'+path)];
            //require前清除缓存，可以在不重启node.js的情况下更改js文件
            var main = require('./function'+path);
            //根据用户请求的目录引入function下对应的js文件
        }catch(e){
            let errCode = 404,msg = 'Function Not Found';
            if(e.name!='Error'){
                //js文件存在但是内部有错误
                errCode = 500;
                msg = 'Internal Server Error';
                console.log('Internal server error on url:"'+url+'" and more infomation is:');
                console.log(e);
            }
            response.writeHead(errCode, defaultHeaders);
            response.end(msg);
            return;
        }
        main($_GET,headers,response);
        //向功能传入url参数、headers和用于回调的response
    return;
});
// 让服务器监听8080端口:
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');

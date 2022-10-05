/*
    @authorName : unrival
    @createTime : 2022-10-5
    @description : http函数模板
    @version : 0.1
*/
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
module.exports = main;
//声明模块

function loadDoc(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = myHandler; //call back function
    xhttp.open("GET", "https://503af314-29ee-420c-9b5c-8dbafbe00352.mock.pstmn.io/score", true);  
    //"GET" 只是其中一种method | true 表示异步调用，加载页面和request两件事互不影响
    xhttp.send(null); //发数据给后端， null说明body是null
    //http 请求：
    //METHOD: GET POST PUT/PATCH DELETE ...
    //URL: host/path
    //header: 发存在cookies里的token ， 下次打开依旧登陆
    //body： {username：tony, pwd: xxx}  是一个json文件

}

//看response判断数据结构
//当拿到数据，如何处理
function myHandler(){
    // state 4 表示done, 下载操作已完成 ｜ 200表示返回正确
    if (this.readyState === 4 && this.status === 200){
        //console.log(this.responseText);   //debug, 看拿回来的是什么数据
        const responseObject = JSON.parse(this.responseText);
        renderData(responseObject);
    }

}

//把拿到的数据展示到浏览器上
// item = {"firstname", "lastname", "score"}
function renderData(responseObject){
    //直接放Object format比较丑
    //html不能换行，字符拼接麻烦
    let html = "<table><tr><th>First Name</th><th>Last Name</th><th>Score</th></tr>"  //tr:table row  th:table header
    for (const item of responseObject){
        html += appendRow(item);

    }
    html += "</table>";  //加表尾
    //操作DOM root 是"scores" , 把这一块替换成刚写的html
    document.getElementById("scores").innerHTML = html;
}

function appendRow(item){
    let row = "<tr>";
    row += `<td>${item.firstName}</td>`;   //`` 里面可以引用变量
    row += `<td>${item.lastName}</td>`;
    row += `<td>${item.score}</td>`;
    row += "</tr>";
    return row
}


//axios 调包， 用底层写繁琐
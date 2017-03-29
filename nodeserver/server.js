var http =require('http');
var url=require('url');


var server=new http.Server(function (req, res) {
    // console.log(req.method, req.url);
    var urlParsed=url.parse(req.url, true);
    // console.log(urlParsed);
    
    if(urlParsed.pathname=='/echo' && urlParsed.query.message){
        res.end(urlParsed.query.message);
    }else {
        res.end("not found");
    }
});


server.listen(1300, 'localhost');
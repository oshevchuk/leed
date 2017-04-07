/**
 * Created by Oshevchuk on 03.04.2017.
 */
var express = require('express');
var MySQL = require('mysql');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const connection = MySQL.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});
// const connection=MySQL.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'nodejs'
// });
// connection.connect(function (err) {});
// connection.query("SET SESSION wait_timeout = 604800");

app.get('/', function (req, res) {
    // res.send('hi');
    // connection.query('SELECT uid, username, email FROM users where uid=100',
    // function (err, rows, fields) {
    //     if(err) console.log('err');
    //     else {
    //         console.log("ok", rows);
    //         if (rows.length==0){
    //             console.log("empty");
    //         }
    //         // console.log("ok", rows[0].uid);
    //     }
    // });

    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            connection.release();
            console.log('error');
        } else {
            console.log('connected');

            tempCont.query('SELECT uid, username, email FROM users where uid=1',
                function (err, rows, fields) {
                    tempCont.release();
                    if (err) console.log('err');
                    else {
                        console.log("ok", rows);
                        if (rows.length == 0) {
                            console.log("empty");
                        }
                        res.json(rows);
                        // console.log("ok", rows[0].uid);
                    }
                });
        }
    })
});

app.post('/userlogin', function (req, res) {
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.end('ok');
    res.header('Access-Control-Allow-Origin', '*');
    // res.sendStatus(200);
    res.json({
        status: 'ok'
    });

    // console.log(req.body);
    var suggest = JSON.parse(req.body.suggest);
    var token = req.body.token;

    var email = suggest.email;
    var name = suggest.name;
    var family_name = suggest.family_name;
    var picture = suggest.picture;
    var locate = suggest.locale;
    var clienID = suggest.clientID;
    var user_id = suggest.user_id;
    var nickname = suggest.nickname;
    var identities = JSON.stringify(suggest.identities);
    var created_at = suggest.created_at;
    var global_client_id = suggest.global_client_id;

    var status=false;
    // console.log(token, email, name, clienID);

    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            connection.release();
            console.log('error');
        } else {
            tempCont.query('SELECT uid, nickname, email FROM users where email="'+email+'"',
                function (err, rows, fields) {
                    tempCont.release();
                    if (err) console.log('err');
                    else {
                        console.log("ok", rows);
                        if (rows.length == 0) {
                            console.log("empty");

                            //begin - add new user to database
                            //data from request
                            connection.getConnection(function (error, tempCont) {
                                if (!!error) {
                                    connection.release();
                                } else {
                                    tempCont.query("INSERT INTO `nodejs`.`users` (`username`, `password`, `email`, `name`, `family_name`, `picture`, `locate`, `clienID`, `user_id`, `nickname`, `identities`, `created_at`, `global_client_id`, `token`) VALUES " +
                                        "(NULL, NULL, '"+email+"', '"+name+"', '"+family_name+"', '"+picture+"', '"+locate+"', '"+clienID+"', '"+user_id+"', '"+nickname+"', '"+identities+"', '"+created_at+"', '"+global_client_id+"', '"+token+"')",
                                        function (err, rows, fields) {
                                            tempCont.release();
                                            if (err) console.log('err');
                                            else {
                                                // console.log("ok", rows);
                                                if (rows.length == 0) {
                                                    // console.log("empty");
                                                }else{
                                                    // console.log(rows[0]);
                                                }

                                                // res.json(rows);
                                                // console.log("ok", rows[0].uid);
                                            }
                                        });
                                }
                            });
                            //end - add new user to database

                        }else{
                            //UPDATE  `nodejs`.`users` SET  `password` =  '23452' WHERE  `users`.`uid` =1;

                            //begin - update token auth
                            connection.getConnection(function (error, tempCont) {
                                if (!!error) {
                                    connection.release();
                                } else {
                                    tempCont.query("UPDATE  `nodejs`.`users` SET  `token` =  '"+token+"' WHERE  `users`.`uid` ='"+rows[0].uid+"';",
                                        function (err, rows_, fields) {
                                            tempCont.release();
                                            if (err) console.log('err');
                                            else {
                                                if (rows_.length == 0) {
                                                }else{
                                                    // res.json({status :"ok"});
                                                    console.log("token update");
                                                }
                                            }
                                        });
                                }
                            });
                            //end
                            console.log(rows[0].uid);
                        }
                        
                        // res.json(rows);
                        // console.log("ok", rows[0].uid);
                    }
                });
        }
    });

    // console.log(suggest.email);
});

app.post('/checktoken', function (req, res) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            connection.release();
        } else {
            tempCont.query("",
                function (err, rows, fields) {
                    tempCont.release();
                    if (err) console.log('err');
                    else {
                        if (rows.length == 0) {
                            // console.log("empty");
                        }else{
                            // console.log(rows[0]);
                        }
                    }
                });
        }
    });
});

app.get('/info', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.end("okokokok");
});

app.listen(3000, function () {
    console.log('start');
});

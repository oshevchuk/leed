/**
 * Created by Oshevchuk on 03.04.2017.
 */
var express = require('express');
var MySQL = require('mysql');

var app =express();

const connection=MySQL.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});
connection.connect(function (err) {});
connection.query("SET SESSION wait_timeout = 604800");

app.get('/', function (req, res) {
    res.send('hi');
    connection.query('SELECT uid, username, email FROM users where uid=100',
    function (err, rows, fields) {
        if(err) console.log('err');
        else {
            console.log("ok", rows);
            if (rows.length==0){
                console.log("empty");
            }
            // console.log("ok", rows[0].uid);
        }
    });
});

app.listen(3000, function () {
    console.log('start');
});

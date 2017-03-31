/**
 * Created by Oshevchuk on 29.03.2017.
 */
var express=require('express');
var bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var artists=[
    {
        id:1 ,
        name: 'meta'
    },{
        id:2 ,
        name: 'gogi'
    },{
        id:3 ,  
        name: 'deep'
    }
];

app.get('/', function (req, res) {
    res.send('ok');
});

app.get('/artists', function (req, res) {
    res.send(artists);
});

app.get('/artists/:id', function (req, res) {
    var artist=artists.find(function (artist) {
        return artist.id===Number(req.params.id);
    });
    res.send(artist);
});

app.listen(3000, function () {
    console.log('API start')
});
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
require('dotenv').config();
var mongoose = require('mongoose');    //MongoDB 접속을 위한 라이브러리. 강력. 대부분의 소스가 이것으로 되어 있음

mongoose.connect(`mongodb+srv://root:${process.env.DB_PW}@dongmin-fyasr.mongodb.net/dongmin?retryWrites=true&w=majority`, {
     useNewUrlParser: true,
     useUnifiedTopology: true });
//mongoose.connect('mongodb+srv://root:1234@dongmin-fyasr.mongodb.net/test?retryWrites=true&w=majority');

var db = mongoose.connection

if(!db) {
    console.log("ERROR CONNECTING MONGO-DB");
} else {
    console.log("DB CONNECTED SUCCESSFULLY");
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('html', require('ejs'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); //response할 때 헤더에 자동으로 붙임
app.use('/api', require('./router/api-routes'));



var port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`서버가 시작되었습니다: http://localhost:${port}`);
});
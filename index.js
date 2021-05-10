var express = require('express');
var app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('port', 0000);
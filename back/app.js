'use strict'

const express = require('express');
const bodyparser = require('body-parser');

//Rutas
const cliente_route = require('./routes/cliente');
const admin_route = require('./routes/admin');
const producto_route = require('./routes/producto');
const cupon_route = require('./routes/cupon');

const app = express();
require('./database');

app.set('port', process.env.PORT || 4201);

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb',extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);
app.use('/api',cupon_route);


app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

module.exports = app;   
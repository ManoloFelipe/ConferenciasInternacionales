'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var conferenciaController = require('../controllers/conferenciaController');
var md_auth = require('../middlewares/autheticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();

//parte para urls

module.exports = api;
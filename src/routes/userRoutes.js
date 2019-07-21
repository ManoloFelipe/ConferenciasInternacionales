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

api.get('/usario/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/usuarios', UserController.getUsers);
api.get('/conferencias',md_auth.ensureAuth, UserController.editarUsuario)
api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.post('/subir-imagen-usuario/:id', [md_auth.ensureAuth, md_subir], UserController.subirImagen);
api.get('/obtener-imagen-usuario/:nombreImagen', UserController.obtenerImagen)
api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario)
api.put('/email/:correo/:codigo', UserController.verificarEmail)
api.delete('/eliminar/:id', md_auth.ensureAuth,UserController.eliminarUsuario)

module.exports = api;
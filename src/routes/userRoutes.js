'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var conferenciaController = require('../controllers/conferenciaController');
var TrackController = require('../controllers/trackController');
var PatrocinadorController = require('../controllers/patrocinadorController');
var md_auth = require('../middlewares/autheticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subirUser = multiparty({ uploadDir: './src/uploads/users' })
var md_subirConf = multiparty({ uploadDir: './src/uploads/conferencias' })


//Rutas
var api = express.Router();

//Usuarios
api.get('/usario/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/usuarios', UserController.getUsers);
api.get('/conferencias', md_auth.ensureAuth, UserController.editarUsuario)
api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.post('/subir-imagen-usuario/:id', [md_auth.ensureAuth, md_subirUser], UserController.subirImagen);
api.get('/obtener-imagen-usuario/:nombreImagen', UserController.obtenerImagen)
api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario)
api.put('/email/:correo/:codigo', UserController.verificarEmail)
api.delete('/eliminar/:id', md_auth.ensureAuth, UserController.eliminarUsuario)
    //Conferencias
api.get('/conferencia/listarAll', conferenciaController.listarCharlas);
api.get('/conferencia/buscar/:id', conferenciaController.buscarCharlaId)
api.post('/conferencia/registrar', conferenciaController.registrarCharla);
api.post('/subir-imagen-usuario/:id', [md_auth.ensureAuth, md_subirConf], conferenciaController.subirImagen);
api.get('/obtener-imagen-usuario/:nombreImagen', conferenciaController.obtenerImagen)
api.put('/conferencia/editar/:id', md_auth.ensureAuth, conferenciaController.editarCharla)
api.put('/conferencia/interesado/:id', md_auth.ensureAuth, conferenciaController.interesadosEnCharla)
api.put('/conferencia/inscribir/:id/:user', md_auth.ensureAuth, conferenciaController.inscribirEnCharla)
api.put('/conferencia/preinscribir/:id/:user', md_auth.ensureAuth, conferenciaController.preregistrarEnCharla)
api.put('/conferencia/registrado/:id/:color/:user', md_auth.ensureAuth, conferenciaController.cambiarColor)
api.delete('/conferencia/eliminar/:id', md_auth.ensureAuth, conferenciaController.eliminarCharla)
    //Track
api.get('/tracks', TrackController.gettracks);
api.post('/track', TrackController.addtracks);
api.get('/track/:id', TrackController.gettrack)
    //Patrocinadores
api.get('/patrocinador/get/nationals', PatrocinadorController.getNacionales)
api.get('/patrocinador/get/internationals', PatrocinadorController.getInternacionales)
api.get('/patrocinador/get/one/:id', PatrocinadorController.getPatrocinador)
api.get('/patrocinador/get/all', PatrocinadorController.getPatrocinadores)
api.put('/patrocinador/upadte/:id', PatrocinadorController.updatePatrocinador)
api.delete('/patrocinador/delete/:id', PatrocinadorController.deletePatrocinador)
api.post('/patrocinador/add', PatrocinadorController.addPatrocinador)
module.exports = api;
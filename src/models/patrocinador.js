'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatrocinadorSchema = Schema({
    nombre: String,
    descripcion: String,
    image: String,
    internacional: Boolean
});

module.exports = mongoose.model('Patrocinador', PatrocinadorSchema);
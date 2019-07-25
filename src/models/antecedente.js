'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AntecedenteSchema= Schema({

    edicion: String,
    lugar: String,
    descripcion: String,
    image: String

})

module.exports = mongoose.model('Antecedentes', AntecedenteSchema);

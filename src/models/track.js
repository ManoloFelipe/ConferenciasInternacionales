'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TrackSchema = Schema({
    titulo: String,
    descripcion: [{
        subIndice: String,
        subDescripcion: String
    }],
    temas: String,
    objetivos: String,
    objetivoGeneral: String,
    dirigidoA: String,
    preRequisitos: String,
    materiales: String,
    metodologia: String,
    instructores: String,
    cupo: String,
    duracion: String,
    agenda: [{
        dia: String,
        descripcionDia: String
    }]
})

module.exports  = mongoose.model('Track', TrackSchema)
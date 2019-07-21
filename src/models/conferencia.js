'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ConferenciaSchema = Schema({
    nombreCharla: String,
    descripcion: String,
    comunicador: String,
    salon: String,
    hora: String,
    fecha: String,
    image: String,
    preregistrados: [String],
    registrados: [{
        user: {type: Schema.ObjectId, ref: "User"},
        color: String
    }]
});

module.exports = mongoose.model('Conferencia', ConferenciaSchema);
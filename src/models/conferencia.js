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
    interesados: [{ type: Schema.ObjectId, ref: "User" }],
    preinscritos: [{ type: Schema.ObjectId, ref: "User" }],
    inscritos: [{
        user: { type: Schema.ObjectId, ref: "User" },
        color: String
    }]
});

module.exports = mongoose.model('Conferencia', ConferenciaSchema);
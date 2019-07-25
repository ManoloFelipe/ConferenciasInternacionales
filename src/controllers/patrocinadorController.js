'use strict'

var Patrocinador = require('../models/patrocinador');

function addPatrocinador(req, res) {
    var patrocinador = new Patrocinador();
    var params = req.body;

    if (params.nombre) {
        patrocinador.nombre = params.nombre;
        patrocinador.descripcion = params.descripcion;
        patrocinador.image = params.image;
        patrocinador.internacional = params.internacional;

        patrocinador.save((err, patrGuardado) => {
            if (err) return res.status(500).send({ message: 'error en patrocinador' })
            if (!patrGuardado) return res.status(400).send({ message: 'error al agregar el patrocinador' })

            return res.status(200).send({ track: 'Patrocinador Guardado' })
        })
    } else {
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        })
    }
}

function getPatrocinadores(req, res) {
    Patrocinador.find().exec((err, enc) => {
        if (err) return res.status(500).send({ message: 'error en patrocinador' })
        if (!enc) return res.status(400).send({ message: 'error al obtener patrocinadores' })

        return res.status(200).send({ patrocinador: enc })
    })
}

function getPatrocinador(req, res) {
    var patId = req.params.id

    Patrocinador.findById(patId, (err, enc) => {
        if (err) return res.status(500).send({ message: 'error en patrocinador' })
        if (!enc) return res.status(400).send({ message: 'error al obtener el patrocinador' })

        return res.status(200).send({ patrocinador: enc })
    })
}

function updatePatrocinador(req, res) {
    var patId = req.params.id

    Patrocinador.findByIdAndUpdate(patId, req.body, { new: true }, (err, enc) => {
        if (err) return res.status(500).send({ message: 'error en patrocinador' })
        if (!enc) return res.status(400).send({ message: 'error al obtener el patrocinador' })

        return res.status(200).send({ patrocinador: 'Patrocinador actualizado' })
    })
}

function deletePatrocinador(req, res) {
    var patId = req.params.id

    Patrocinador.findByIdAndUpdate(patId, (err, enc) => {
        if (err) return res.status(500).send({ message: 'error en patrocinador' })
        if (!enc) return res.status(400).send({ message: 'error al obtener el patrocinador' })

        return res.status(200).send({ patrocinador: 'Patrocinador eliminado' })
    })
}

function getNacionales(req, res) {
    Patrocinador.find({ internacional: false }, (err, enc) => {
        if (err) return res.status(500).send({ message: 'error en patrocinador' })
        if (!enc) return res.status(400).send({ message: 'error al obtener patrocinadores' })

        return res.status(200).send({ patrocinadores: enc })
    })
}

function getInternacionales(req, res) {
    Patrocinador.find({ internacional: true }, (err, enc) => {
        if (err) return res.status(500).send({ message: 'error en patrocinador' })
        if (!enc) return res.status(400).send({ message: 'error al obtener patrocinadores' })

        return res.status(200).send({ patrocinadores: enc })
    })
}

module.exports = {
    getNacionales,
    getInternacionales,
    getPatrocinador,
    getPatrocinadores,
    updatePatrocinador,
    deletePatrocinador,
    addPatrocinador
}
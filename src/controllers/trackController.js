'use strict'

var Track = require('../models/track');

function gettracks(req, res) {
    Track.find().exec((err, tracks)=>{
        if(err) return res.status(500).send({message: 'error en track'})
        if(!tracks) return res.status(400).send({message: 'error al listar las tracks'})

        return res.status(200).send({tracks});
    })
}

function gettrack(req, res) {
    var trackId = req.params.id;
    Track.findById(trackId, (err, track)=>{
        if(err) return res.status(500).send({message: 'error en la track'})
        if(!track) return res.status(400).send({message: 'error al listar la track'})
        return res.status(200).send({track})
    })
}

function addtracks(req, res) {
    var track = new Track();
    var params = req.body;

    if(params.titulo){
        track.titulo = params.titulo;
        track.descripcion.subIndice = params.subIndice;
        track.descripcion.subDescripcion = params.subDescripcion
        track.temas = params.temas
        track.objetivos = params.objetivos;
        track.objetivoGeneral = params.objetivoGeneral;
        track.dirigidoA = params.dirigidoA;
        track.preRequisitos = params.preRequisitos;
        track.materiales = params.materiales;
        track.metodologia = params.metodologia;
        track.instructores = params.instructores;
        track.cupo = params.cupo;
        track.duracion = params.duracion;
        track.agenda.dia = params.diaAgenda
        track.agenda.descripcionDia = params.descripcionDia 


        track.save((err, trackGuardada)=>{
            if(err) return res.status(500).send({message: 'error en track'})
            if(!trackGuardada) return res.status(400).send({message: 'error al agregar la track'})

            return res.status(200).send({track: trackGuardada})
        })
    }else{
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        })
    }
}


module.exports = { 
    gettracks,
    addtracks,
    gettrack
}
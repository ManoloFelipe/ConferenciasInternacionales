'use strict'

var Charla = require('../models/conferencia');
var User = require('../models/user');


function registrarCharla(req, res) {
    var charla = new Charla();
    var params = req.body;

    if (params.nombreCharla && params.descripcion && params.comunicador && params.salon && params.fecha) {
        charla.nombreCharla = params.nombreCharla;
        charla.descripcion = params.descripcion;
        charla.comunicador = params.comunicador;
        charla.salon = params.salon;
        charla.fecha = params.fecha;
        charla.hora = params.hora;
        charla.image = params.image;
        charla.preregistrados = [];
        charla.registrados = [];
        Charla.find({
            $or: [
                { nombreCharla: charla.nombreCharla }
            ]
        }).exec((err, charlas) => {

            if (err) return res.status(500).send({ message: 'Error en la peticion de usuario' })

            if (charla && charlas.length >= 1) {
                return res.status(500).send({ message: 'el evento ya existe' });
            } else {

                charla.save((err, charlaGuardada) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar el evento' })

                    if (charlaGuardada) {
                        res.status(200).send({ charla: charlaGuardada })
                    } else {
                        res.status(404).send({ message: 'no se a podido registrar el evento' })
                    }
                })

            }
        })
    } else {
        res.status(200).send({
            message: 'rellene los datos necesarios'
        })
    }
}

function editarCharla(req, res) {
    var charlaId = req.params.id;
    var params = req.body;
    
    Charla.findByIdAndUpdate(charlaId, params, { new: true }, (err, charlaActualizada) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!charlaActualizada) return res.status(404).send({ message: 'no se a podido actualizar el evento' });

        return res.status(200).send({ charla: 'La charla fue editada' });
    })
}

function eliminarCharla(req, res) {
    var charlaId = req.params.id;
    var params = req.body;

    Charla.findByIdAndDelete(charlaId, (err, charlaEliminada) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!charlaEliminada) return res.status(404).send({ message: 'no se a podido eliminar el evento' });

        return res.status(200).send({ conferencia: charlaEliminada });
    })
}

function listarCharlas(req, res) {

    Charla.find((err, charlas) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!charlas) return res.status(404).send({ message: 'no se ha encontrados eventos' });

        return res.status(200).send({ charlas: charlas });
    })
}

function buscarCharlaId(req, res) {
    var id = req.params.id;

    Charla.findById(id, (err, enc) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });

        if (!enc) return res.status(404).send({ message: 'sin charlas' });

        return res.status(200).send({ charla: enc });
    })
}

function preRegistrar(req, res) {
    var charlaId = req.params.id;
    var userId = req.user.sub

    Charla.findById(charlaId, (err, enc) => {

        if (err) return res.status(500).send({ message: 'error en la peticion' });
        if (!enc) return res.status(404).send({ message: 'la conferencia no existe' });

        for (let i = 0; i < enc.preregistrados.length; i++) {
            if (enc.preregistrados[i] == userId) {
                return res.status(200).send({ message: 'ya esta inscrito a este evento' });
            }
        }//eslte for se encarga de buscar si el usuario ya se preregistro con anterioridad

        Charla.findOne({ _id: charlaId, registrados: { $elemMatch: { user: userId } } }, (err, userEnc) => {
            //este .findOne se encarga de buscar si el usuario ya esta registrado,
            //para no volver a preregistrarse

            if (err) return res.status(500).send({ message: 'error en la peticion' });

            if (userEnc) return res.status(404).send({ message: 'ya esta inscrito a este evento' });
            //el if de arriba manda mensaje en caso de que el usuario ya este registrado al evento

            //el findByIdAndUpdate solo se generara si no existe tu usuario dentro de ese evento
            Charla.findByIdAndUpdate(charlaId, { $addToSet: { preregistrados: userId } }, { new: true }, (err, newOcupado) => {
                if (err) return res.status(500).send({ message: 'error en la peticion' });

                if (!newOcupado) return res.status(404).send({ message: 'no se ha podido generar una inscripcion' });

                return res.status(200).send({ message: 'inscripcion generada exitosamente' });
            })
        })
    })
}

function registrarEnCharla(req, res) {
    var charlaId = req.params.id;
    var userId = req.user.sub

    Charla.findById(charlaId, (err, enc) => {

        if (err) return res.status(500).send({ message: 'error en la peticion' });
        if (!enc) return res.status(404).send({ message: 'la conferencia no existe' });

        for (let i = 0; i < enc.preregistrados.length; i++) {
            if (enc.preregistrados[i] != userId && i == enc.preregistrados.length-1) {
                return res.status(200).send({ message: 'ya esta inscrito a este evento' });
            }
        }//este for se encarga de buscar si el usuario ya se preregistro con anterioridad, si no es haci, no deja registrarlo

        Charla.findOne({ _id: charlaId, registrados: { $elemMatch: { user: userId } } }, (err, userEnc) => {
            //este .findOne se encarga de buscar si el usuario ya esta registrado,
            //para no volver a registrarse

            if (err) return res.status(500).send({ message: 'error en la peticion' });

            if (userEnc) return res.status(404).send({ message: 'ya esta registrado a este evento' });
            //el if de arriba manda mensaje en caso de que el usuario ya este registrado al evento

            //el findByIdAndUpdate solo se generara si no existe tu usuario dentro de ese evento
            Charla.findByIdAndUpdate(charlaId, { $push: {//Lo que hace esto, es agregar al usuario con el color predeterminado blanco en su carnet
                registrados: {
                    user: userId,
                    color: 'White'
                    }
                }
            }, { new: true }, (err, newOcupado) => {
                if (err) return res.status(500).send({ message: 'error en la peticion' });

                if (!newOcupado) return res.status(404).send({ message: 'no se ha podido generar una inscripcion' });

                return res.status(200).send({ message: 'Registro generado exitosamente' });
            })
        })
    })
}

function cambiarColor(req, res) {
    //ACLARACION: el color es un string, tomarlo en cuenta para el front
    var charlaId = req.params.id;
    var userId = req.user.sub

    Charla.findOneAndUpdate({ _id: charlaId, registrados: { $elemMatch: { user: userId } } },
        { "registrados.$.color": req.params.color }, { new: true }, (err, usuarioActualizado) => {
            if (err) return res.status(500).send({ message: 'error en la peticion de aumentar candidad a producto de usuario' })

            if (!usuarioActualizado) return res.status(200).send({ message: 'No se ha registrado en esta charla' })

            return res.status(200).send({ usuario: usuarioActualizado })
        })
}


function subirImagen(req, res) {
    var charlaId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);

        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[3];
        console.log(file_name);

        var ext_split = file_name.split('\.');
        console.log(ext_split);

        var file_ext = ext_split[1];
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Charla.findByIdAndUpdate(charlaId, { image: file_name }, { new: true }, (err, usuarioActualizado) => {
                if (err) return res.status(500).send({ message: ' no se a podido actualizar la conferencia' })

                if (!usuarioActualizado) return res.status(404).send({ message: 'error en los datos de la conferencia, no se pudo actualizar' })

                return res.status(200).send({ conferencia: 'imagen subida' });
            })
        } else {
            return removeFilesOfUploads(res, file_path, 'extension no valida')
        }

    }
}

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

function obtenerImagen(req, res) {
    var image_file = req.params.nombreImagen;
    var path_file = './src/uploads/conferencias/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    });
}

module.exports = {
    registrarCharla,
    editarCharla,
    eliminarCharla,
    listarCharlas,
    buscarCharlaId,
    preRegistrar,
    registrarEnCharla,
    cambiarColor,
    subirImagen,
    obtenerImagen,
}

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
    var path_file = './src/uploads/sponsor' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    });
}

module.exports = {
    getNacionales,
    getInternacionales,
    getPatrocinador,
    getPatrocinadores,
    updatePatrocinador,
    deletePatrocinador,
    addPatrocinador,
    obtenerImagen,
    subirImagen
}
'use strict'

var Antecedente = require('../models/antecedente');



function agregarAntecedente(req,res){

    var antecedente = new Antecedente();
    var params = req.body;

    if(params.edicion && params.lugar && params.descripcion){

        antecedente.edicion = params.edicion;
        antecedente.lugar = params.lugar;
        antecedente.descripcion = params.descripcion;
        antecedente.image = null;


        antecedente.save((err,antecedenteGuardado)=>{

            if(err) return res.status(500).send({message:'error en la peticion'});

            if(!antecedenteGuardado) return res.status(404).send({message:'No se a Guardado el antecedente'});

            return res.status(200).send({antecedente:antecedenteGuardado});
        })


    }else{
        res.status(200).send({
            message: 'Debe rellenar todos los datos Necesarios'
        });
    }

}


function eliminarAntecedente(req,res){

    var idAntecedente = req.params.id


    Antecedente.findByIdAndDelete(idAntecedente,(err,AntecedenteE)=>{

        if(err) return res.status(500).send({message:'No se a podido realizar la peticion'});

        if(!AntecedenteE) return res.status(404).send({message:'no se a podido eliminar '});;

        return res.status(200).send({message:'Antecedente Eliminado'});
    })

}

function editarAntecedente(req,res){


    var params = req.body;
    var idAntecedente = req.params.id;


    Antecedente.findByIdAndUpdate(idAntecedente,params, {new:true},(err,AntecedenteEditado)=>{
       
        if(err) return res.status(500).send({message:'No se a podido realizar la peticion'});

        if(!idAntecedente) return res.status(404).send({message:'No se a podido editar el antecedente'});

        return res.status(200).send({antecedente:AntecedenteEditado});
    })
}


function listarId(req,res){

    var AntecedenteId = req.params.id;

    Antecedente.findById(AntecedenteId,(err,Encontrado)=>{

            
        if(err) return res.status(500).send({message:'No se a podido realizar la peticion'});

        if(!Encontrado) return res.status(404).send({message:'No se a podido encontrar el antecedente'});

        return res.status(200).send({antecedente:Encontrado});
    })
}

function listar(req,res){

    Antecedente.find((err,lista)=>{

               
        if(err) return res.status(500).send({message:'No se a podido realizar la peticion'});

        if(!lista) return res.status(404).send({message:'No se a podido encontrar el antecedente'});

        return res.status(200).send({antecedente:lista});

    })
}

module.exports ={
    agregarAntecedente,
    eliminarAntecedente,
    editarAntecedente,
    listarId,
    listar

}
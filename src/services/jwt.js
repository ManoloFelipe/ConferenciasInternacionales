'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        telefono: user.telefono,
        profesion: user.profesion,
        sexo: user.sexo,
        empresa: user.empresa,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        image: user.image,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}
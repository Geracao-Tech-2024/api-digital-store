// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require('./../controller/usuariosController');

const express = require('express');
const usuarios = express();
const jwt_alth = require('../middleware/jwt_alth');

usuarios.get('/:id', Controller.getUsuario);
usuarios.post('/', Controller.setUsuario);
usuarios.put('/:id', jwt_alth.verifyJWT, Controller.updateUsuario);
usuarios.delete('/:id', jwt_alth.verifyJWT, Controller.deleteUsuario);
usuarios.post('/token', Controller.gerarToken)

module.exports = usuarios;
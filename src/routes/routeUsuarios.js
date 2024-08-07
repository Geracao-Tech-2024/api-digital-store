// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require('./../controller/usuariosController');

const express = require('express');
const usuarios = express();

usuarios.get('/', Controller.getUsuario);
usuarios.get('/:id', Controller.getUsuario);
usuarios.post('/', Controller.setUsuario);
usuarios.put('/:id', Controller.updateUsuario);
usuarios.patch('/:id', Controller.updateUsuario);
usuarios.delete('/:id', Controller.deleteUsuario);

module.exports = usuarios;
// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require('./../controller/categoriasController');

const express = require('express');
const categories = express();

categories.get('/', Controller.getCategories);
categories.get('/:id', Controller.getCategories);
categories.post('/', Controller.setCategories);
categories.put('/:id', Controller.updateCategories);
categories.patch('/:id', Controller.updateCategories);
categories.delete('/:id', Controller.deleteCategories);

module.exports = categories;
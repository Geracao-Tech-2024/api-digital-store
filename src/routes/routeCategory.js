// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require('./../controller/categoryController');

const express = require('express');
const category = express();

category.get('/', Controller.getCategory);
category.get('/:id', Controller.getCategory);
category.post('/', Controller.setCategory);
category.put('/:id', Controller.updateCategory);
category.patch('/:id', Controller.updateCategory);



category.delete('/:id', Controller.deleteCategory);

module.exports = category;
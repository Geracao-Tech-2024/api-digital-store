// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require('./../controller/categoryController');

const express = require('express');
const category = express();

category.get('/:id', Controller.getCategoryById)
category.get('/', Controller.getAllCategorys);
category.put('/:id',Controller.updateCategory);
category.delete('/:id', Controller.deleteCategory);
category.post('/', Controller.postCategory);

module.exports = category;
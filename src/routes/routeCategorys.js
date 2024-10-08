// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require('./../controller/categoryController');
const jwt_alth = require('./../middleware/jwt_alth');
const express = require('express');
const category = express();

category.get('/:id', Controller.getCategoryById)
category.get('/search', Controller.getAllCategorys);
category.put('/:id', jwt_alth.verifyJWT, Controller.updateCategory);
category.delete('/:id', jwt_alth.verifyJWT, Controller.deleteCategory);
category.post('/', jwt_alth.verifyJWT,Controller.postCategory);

module.exports = category;
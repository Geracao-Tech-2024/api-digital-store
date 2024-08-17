// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require("../controller/productController.js");
const jwt_alth = require('./../middleware/jwt_alth');
const express = require("express");
const product = express();

product.get('/search', Controller.getAllProducts);
product.get("/:id", Controller.getProductById);
product.post("/", jwt_alth.verifyJWT, Controller.postProducts);
product.put("/:id", jwt_alth.verifyJWT, Controller.updateProduct);
product.delete("/:id", jwt_alth.verifyJWT, Controller.deleteProduct);

module.exports = product;
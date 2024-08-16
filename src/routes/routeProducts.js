// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require("../controller/productController.js");

const express = require("express");
const product = express();
product.get('/', Controller.getAllProducts);
product.get("/:id", Controller.getProductById);
product.post("/", Controller.postProducts);
product.delete("/:id", Controller.deleteProduct);
module.exports = product;

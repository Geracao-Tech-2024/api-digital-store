// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require("../controller/productController.js");

const express = require("express");
const product = express();

product.get("/", Controller.getProductById);
product.post("/", Controller.postProduct);

module.exports = product;

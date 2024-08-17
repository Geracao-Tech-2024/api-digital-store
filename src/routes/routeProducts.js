// faça a chamada da função dos controllers (é onde fica a regra de negocios)
const Controller = require("../controller/productController.js");

const express = require("express");
const product = express();
product.get('/search', Controller.getAllProducts);
product.get("/:id", Controller.getProductById);
product.post("/", Controller.postProducts);
product.put("/:id", Controller.updateProduct);
product.delete("/:id", Controller.deleteProduct);

module.exports = product;
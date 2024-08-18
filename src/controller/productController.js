const productService = require("../services/productService.js");

class productController {
  async getAllProducts(req,res){
    try{
      let resp = await productService.getAllProducts(req);
      res.status(resp.status).json(resp.message);
    } catch (erro) {
      res.status(500).send(erro.message);
    }
  }
  
  async getProductById(req, res) {
    try {
      const resp = await productService.getProductById(req);
      res.status(resp.status).json(resp.message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async postProducts(requisicao, resposta) {
    try {
      let retorno = await productService.postProducts(requisicao);
      resposta.status(retorno.status).json(retorno.message);
    } catch (erro) {
      resposta.status(500).send(erro.message);
    }
  }
  async updateProduct(requisicao, resposta) {
    try {
      const resp = await productService.updateProduct(requisicao);
      resposta.status(resp.status).json(resp.message);
    } catch (error) {
      resposta.status(500).send(error.message);
    }
  }
  async deleteProduct(requisicao, resposta) {
    try {
      const resp = await productService.deleteProduct(requisicao);
      resposta.status(resp.status).json(resp.message);
    } catch (error) {
      resposta.status(500).send(error.message);
    }
  }
  
}
module.exports = new productController();

const productService = require("../services/productService.js");

class productController {
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const resp = await productService.getProductById(id);
      res.status(resp.status).send(resp.message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async postProducts(requisicao, resposta) {
    try {
      let retorno = await productService.postProducts(requisicao);
      resposta.status(retorno.status).send(retorno.message);
    } catch (erro) {
      resposta.status(500).send(erro.message);
    }
  }

  async deleteProduct(requisicao, resposta) {
    try {
      const resp = await productService.deleteProduct(requisicao);
      resposta.status(resp.status).send(resp.message);
    } catch (error) {
      resposta.status(500).send(error.message);
    }
  }
  
}
module.exports = new productController();

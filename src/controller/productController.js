const productService =  require('../services/productService.js');

class productController {
    async getProduct(requisicao, resposta) {
        try {
            let resp = await productService.getProduct(requisicao);
            resposta.status(resp.status).send(resp.message)
        } catch (erro) {
            resposta.status(500).send(erro.message)
        }
    }
}
module.exports = new productController();


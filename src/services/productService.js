const Product = require("../models/Product");

class ProductServices {
  async getProductById(id) {
    // Simulação de busca no banco de dados
    const product = {
      id: 1,
      enabled: true,
      name: "Produto 01",
      slug: "product-01",
      stock: 10,
      description: "Descrição do produto 01",
      price: 119.90,
      price_with_discount: 99.90,
      category_ids: [1, 15, 24, 68],
      images: [
        {
          id: 1,
          content: "https://store.com/media/product-01/image-01.png"
        },
        {
          id: 2,
          content: "https://store.com/media/product-01/image-02.png"
        },
        {
          id: 3,
          content: "https://store.com/media/product-01/image-02.jpg"
        }
      ],
      options: [
        { 
          id: 1
          // Adicionar outras propriedades conforme necessário
        },
        { 
          id: 2
          // Adicionar outras propriedades conforme necessário
        }
      ]
    };

    if (product.id === parseInt(id)) {
      return {
        status: 200,
        message: product
      };
    } else {
      return {
        status: 404,
        message: "Product not found"
      };
    }
  }

  async postProducts() {
    return "todos os usuarios";
  }
}

module.exports = new ProductServices();

const Product = require("../models/Product");

class ProductServices {
  async getAllProducts(req) {
    const produtos = await Product.findAll();

    if (!produtos || produtos.length === 0) {
        return { status: 404, message: "Not found" };
    }

    let { limit, fields, page} = req.body;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10);

    let dadosProducts = produtos.map(prod => {
      const baseData = {};
      if( fields == "name"){
        baseData.name = prod.name
      }if(fields == "image"){
        baseData.image = prod.image
      }if(fields == "price"){
        baseData.price = prod.price
      }
      baseData.id = prod.id;
      return baseData;
  
    });

    if (limit === -1){
        return { status: 200, message: dadosProducts };
      }else{
        if (isNaN(limit) || limit < 1) {
            limit = 12;
        }
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        if (startIndex >= dadosProducts.length) {
            return { status: 200, message: [] };
        }
        dadosProducts = dadosProducts.slice(startIndex, endIndex);

        return { status: 200, message: dadosProducts };
    }
}

  async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (product) {
        return {
          status: 200,
          message: product,
        };
      } else {
        return {
          status: 404,
          message: "Product not found",
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  async postProducts(req) {
    const {
      enabled,
      name,
      image,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    } = req.body;

    if (
      !enabled ||
      !name ||
      !slug ||
      !stock ||
      !description ||
      !price ||
      !price_with_discount ||
      !Array.isArray(category_ids) ||
      !Array.isArray(images) ||
      !Array.isArray(options)
    ) {
      return { status: "400", message: "Bad Request" };
    }
    const newProduct = {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    };
    await Product.create(newProduct);
    return { status: "201", message: "Created" };
  }
  async deleteProduct(req) {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return { message: "Produto não encontrado", status: 404 };
    }

    await Product.destroy({
      where: { id: `${id}` },
    });

    return { message: "Produto deletado com sucesso", status: 204 };
  }
}

module.exports = new ProductServices();

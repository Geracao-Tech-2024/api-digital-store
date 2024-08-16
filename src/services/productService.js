const Product = require("../models/Product");

class ProductServices {
  async getAllProducts(req) {
    
    const produtos = await Product.findAll();

    if (!produtos || produtos.length === 0) {
        return { status: 404, message: "Produto Não Encontrado" };
    }

    let { limit, fields, page, match } = req.body;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;

    return{status : 200, message: produtos}

    // const campos = fields ? fields.split(',') : ['name', 'images', 'price'];

    // let produtosFiltrados = produtos;
    // if (match) {
    //     const termoBusca = match.toLowerCase();
    //     produtosFiltrados = produtos.filter(produto => 
    //         produto.name.toLowerCase().includes(termoBusca) ||
    //         produto.description.toLowerCase().includes(termoBusca)
    //     );
    // }

    // produtosFiltrados = produtosFiltrados.map(produto => {
    //     const produtoFiltrado = {};
    //     campos.forEach(campo => {
    //         if (produto.hasOwnProperty(campo)) {
    //             produtoFiltrado[campo] = produto[campo];
    //         }
    //     });
    //     return produtoFiltrado;
    // });

    // const inicio = (page - 1) * limit;
    // const fim = inicio + limit;
    // const produtosPag = produtosFiltrados.slice(inicio, fim);

    // return {
    //     status: 200,
    //     data: produtosPag
    // };
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
      slug,
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
    const { id } = req.params
    const product = await Product.findByPk(id);

    if (!product) {
      return { message: 'Produto não encontrado', status: 404 };
    }

    await Product.destroy({
      where: { id: `${id}` }
    });

    return { message: 'Produto deletado com sucesso', status: 204 };
  }
}




module.exports = new ProductServices();

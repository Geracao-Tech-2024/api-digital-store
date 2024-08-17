const Product = require("../models/Product");

class ProductServices {
  // produtos deve ter um campo com nome [category_id] que tem os ids correspodentes em product_category

  async getAllProducts(req) {
    const { limit, page, fields, match, category_ids, price_range } = req.body;

    // Defina valores padrão
    const pageNumber = page || 1;
    const pageSize = isNaN(parseInt(limit, 10)) ? 12 : parseInt(limit, 10);

    // Construir o filtro de consulta
    let query = {};

    if (category_ids && category_ids.length > 0) {
        query.category_id = { $in: category_ids };
    }

    if (price_range) {
        const [min, max] = price_range.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
            query.price = { $gte: min, $lte: max };
        }
    }

    if (match) {
        const matchLower = match.toLowerCase();
        query.$or = [
            { name: { $regex: matchLower, $options: 'i' } },
            { description: { $regex: matchLower, $options: 'i' } }
        ];
    }

    // Consultar produtos com os filtros
    let produtos = await Product.findAll({ where: query });

    if (!produtos || produtos.length === 0) {
        return { status: 404, message: "Not found" };
    }

    // Filtrar campos
    if (fields) {
        const fieldsArray = fields.split(',');
        produtos = produtos.map(prod => {
            let filteredProd = { id: prod.id };
            fieldsArray.forEach(field => {
                if (prod[field] !== undefined) {
                    filteredProd[field] = prod[field];
                }
            });
            return filteredProd;
        });
    }

    // Ignorar paginação se limit for -1
    if (pageSize === -1) {
        return { status: 200, message: { data: produtos } };
    } else {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Garantir que o índice final não ultrapasse o tamanho do array
        if (startIndex >= produtos.length) {
            return { status: 200, message: [] }; // Página solicitada não existe
        }

        // Aplicar paginação
        produtos = produtos.slice(startIndex, endIndex);

        return { status: 200, message: { data: produtos } };
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

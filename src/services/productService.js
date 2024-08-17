const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductImage = require("../models/ProductImage");
const ProductOption = require("../models/ProductOption");
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
      query.category_id = { [Op.in]: category_ids };
    }

    if (price_range) {
      const [min, max] = price_range.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        query.price = { [Op.gte]: min, [Op.lte]: max };
      }
    }

    if (match) {
      const matchLower = match.toLowerCase();
      query[Op.or] = [
        { name: { [Op.iLike]: `%${matchLower}%` } },
        { description: { [Op.iLike]: `%${matchLower}%` } }
      ];
    }

    // Consultar produtos com os filtros
    let produtos = await Product.findAll({
      where: query,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!produtos || produtos.length === 0) {
      return { status: 404, message: "Not found" };
    }

    const totalProducts = produtos.length;

    // Obter IDs das categorias, imagens, e opções para cada produto
    const productsWithDetails = await Promise.all(produtos.map(async prod => {
      // Obter IDs das categorias
      const categories = await ProductCategory.findAll({
        attributes: ['category_id'], // Apenas o campo necessário
        where: { product_id: prod.id }
      });
      const categoryIds = categories.map(cat => cat.category_id);

      // Obter imagens
      const images = await ProductImage.findAll({
        attributes: ['id', 'path'], // Apenas os campos necessários
        where: { product_id: prod.id }
      });
      const imageDetails = images.map(img => ({
        id: img.id,
        content: img.path
      }));

      // Obter opções
      const options = await ProductOption.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { product_id: prod.id }
      });
      const optionDetails = options.map(opt => opt.toJSON());

      return {
        ...prod.toJSON(),
        category_ids: categoryIds,
        images: imageDetails,
        options: optionDetails
      };
    }));

    // Filtrar campos
    if (fields) {
      const fieldsArray = fields.split(',');
      produtos = productsWithDetails.map(prod => {
        let filteredProd = { id: prod.id };
        fieldsArray.forEach(field => {
          if (prod[field] !== undefined) {
            filteredProd[field] = prod[field];
          }
        });
        return filteredProd;
      });
    } else {
      produtos = productsWithDetails;
    }

    // Ignorar paginação se limit for -1
    if (pageSize === -1) {
      return {
        status: 200,
        message: {
          data: produtos,
          total: totalProducts,
          limit: pageSize,
          page: pageNumber
        }
      };
    } else {
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Garantir que o índice final não ultrapasse o tamanho do array
      if (startIndex >= produtos.length) {
        return { status: 200, message: [] }; // Página solicitada não existe
      }

      // Aplicar paginação
      produtos = produtos.slice(startIndex, endIndex);

      return {
        status: 200,
        message: {
          data: produtos,
          total: totalProducts,
          limit: pageSize,
          page: pageNumber
        }
      };
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

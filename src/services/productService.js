const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductImage = require("../models/ProductImage");
const ProductOption = require("../models/ProductOption");
const Category = require("../models/Category");
class ProductServices {

  async getAllProducts(req) {
    const { limit, page, fields, match, category_ids, price_range } = req.body;

    const pageNumber = page || 1;
    const pageSize = isNaN(parseInt(limit, 10)) ? 12 : parseInt(limit, 10);

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

  async getProductById(req) {
    const { id } = req.params;

    // Consultar o produto pelo ID
    const produto = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!produto) {
      return { status: 404, message: "Product not found" };
    }

    // Obter IDs das categorias
    const categories = await ProductCategory.findAll({
      attributes: ['category_id'], // Apenas o campo necessário
      where: { product_id: produto.id }
    });
    const categoryIds = categories.map(cat => cat.category_id);

    const images = await ProductImage.findAll({
      attributes: ['id', 'path'], // Apenas os campos necessários
      where: { product_id: produto.id }
    });
    const imageDetails = images.map(img => ({
      id: img.id,
      content: img.path
    }));

    // Obter opções
    const options = await ProductOption.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { product_id: produto.id }
    });
    const optionDetails = options.map(opt => opt.toJSON());

    // Retornar o produto com categorias, imagens e opções
    return {
      status: 200,
      message: {
        id: produto.id,
        enabled: produto.enabled,
        name: produto.name,
        slug: produto.slug,
        stock: produto.stock,
        description: produto.description,
        price: produto.price,
        price_with_discount: produto.price_with_discount,
        category_ids: categoryIds,
        images: imageDetails,
        options: optionDetails
      }
    };
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
      options
    } = req.body;

    // Validar a entrada principal
    if (!name || !slug || !price || !price_with_discount) {
      return { status: 400, message: "Missing required fields: name, slug, price, or price_with_discount" };
    }

    // Criar o produto
    const produto = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

    // Criar categorias
    if (category_ids) {
      const validCategories = await Category.findAll({
        where: { id: category_ids }
      });
      const validCategoryIds = validCategories.map(cat => cat.id);
      const invalidCategoryIds = category_ids.filter(id => !validCategoryIds.includes(id));
      if (invalidCategoryIds.length > 0) {
        return { status: 400, message: `Invalid category IDs: ${invalidCategoryIds.join(', ')}` };
      }
      const newCategories = validCategoryIds.map(category_id => ({
        product_id: produto.id,
        category_id
      }));
      await ProductCategory.bulkCreate(newCategories);
    }

    // Criar imagens
    if (images) {
      const newImages = images.map(image => ({
        product_id: produto.id,
        path: image.content
      }));
      await ProductImage.bulkCreate(newImages);
    }

    // Criar opções
    if (options) {
      for (const option of options) {
        const newOption = { ...option };

        // Ajustar valor do radius para número
        if (newOption.radius) {
          const radiusNumber = parseFloat(newOption.radius);
          if (!isNaN(radiusNumber)) {
            newOption.radius = radiusNumber;
          } else {
            return { status: 400, message: `Invalid radius value: ${newOption.radius}` };
          }
        }

        // Ajustar value e values para string
        if (newOption.values) {
          if (Array.isArray(newOption.values)) {
            newOption.values = newOption.values.join(','); // Converter array para string separada por vírgulas
          } else {
            return { status: 400, message: `Invalid values type: ${typeof newOption.values}` };
          }
        } else if (newOption.value) {
          newOption.values = newOption.value.toString(); // Converter value para string
          delete newOption.value; // Remover o campo value se values estiver presente
        } else {
          newOption.values = ''; // Garantir que values nunca seja null
        }

        await ProductOption.create({
          ...newOption,
          product_id: produto.id
        });
      }
    }

    return { status: 201, message: produto };
  }

  async updateProduct(req) {
    const { id } = req.params;
    const updateData = req.body;

    // Consultar o produto pelo ID
    let produto = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!produto) {
      return { status: 404, message: "Product not found" };
    }

    // Atualizar os dados principais do produto
    await produto.update({
      enabled: updateData.enabled,
      name: updateData.name,
      slug: updateData.slug,
      stock: updateData.stock,
      description: updateData.description,
      price: updateData.price,
      price_with_discount: updateData.price_with_discount,
    });

    // Atualizar categorias
    if (updateData.category_ids) {
      const validCategories = await Category.findAll({
        where: { id: updateData.category_ids }
      });
      const validCategoryIds = validCategories.map(cat => cat.id);
      const invalidCategoryIds = updateData.category_ids.filter(id => !validCategoryIds.includes(id));
      if (invalidCategoryIds.length > 0) {
        return { status: 400, message: `Invalid category IDs: ${invalidCategoryIds.join(', ')}` };
      }
      await ProductCategory.destroy({ where: { product_id: id } });
      const newCategories = validCategoryIds.map(category_id => ({
        product_id: id,
        category_id
      }));
      await ProductCategory.bulkCreate(newCategories);
    }

    // Atualizar imagens
    if (updateData.images) {
      for (const image of updateData.images) {
        if (image.deleted && image.id) {
          await ProductImage.destroy({ where: { id: image.id, product_id: id } });
        } else if (image.id) {
          await ProductImage.update(
            { path: image.content },
            { where: { id: image.id, product_id: id } }
          );
        } else {
          await ProductImage.create({
            product_id: id,
            path: image.content
          });
        }
      }
    }

    // Atualizar opções
    if (updateData.options) {
      for (const option of updateData.options) {
        const updatedOption = { ...option };

        // Ajustar valor do radius se necessário
        if (updatedOption.radius) {
          const radiusMatch = updatedOption.radius.match(/^(\d+)(px)?$/);
          if (radiusMatch) {
            // Obter o valor numérico
            updatedOption.radius = parseFloat(radiusMatch[1]);
          } else {
            return { status: 400, message: `Invalid radius value: ${updatedOption.radius}` };
          }
        }

        // Ajustar values e value para string
        if (updatedOption.values) {
          if (Array.isArray(updatedOption.values)) {
            updatedOption.values = updatedOption.values.join(','); // Converter array para string separada por vírgulas
          } else {
            return { status: 400, message: `Invalid values format: ${updatedOption.values}` };
          }
        }

        if (updatedOption.value) {
          if (Array.isArray(updatedOption.value)) {
            updatedOption.value = updatedOption.value.join(','); // Converter array para string separada por vírgulas
          } else {
            return { status: 400, message: `Invalid value format: ${updatedOption.value}` };
          }
        }

        // Atualizar ou criar opções
        if (updatedOption.deleted && updatedOption.id) {
          await ProductOption.destroy({ where: { id: updatedOption.id, product_id: id } });
        } else if (updatedOption.id) {
          await ProductOption.update(
            updatedOption,
            { where: { id: updatedOption.id, product_id: id } }
          );
        } else {
          await ProductOption.create({
            ...updatedOption,
            product_id: id
          });
        }
      }
    }

    return { status: 204, message: "" };
  }

  async deleteProduct(req) {
    const { id } = req.params;

    // Consultar o produto pelo ID
    const produto = await Product.findOne({
        where: { id },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!produto) {
        return { status: 404, message: "Product not found" };
    }

    // Excluir associações relacionadas
    await ProductCategory.destroy({ where: { product_id: id } });
    await ProductImage.destroy({ where: { product_id: id } });
    await ProductOption.destroy({ where: { product_id: id } });

    // Excluir o produto
    await produto.destroy();

    return { status: 204, message: "" };
}
}

module.exports = new ProductServices();

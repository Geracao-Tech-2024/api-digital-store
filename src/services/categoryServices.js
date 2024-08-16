const Category = require("../models/Category");

class CategoriesServices {
  async getCategorys(req) {
    const categorias = await Category.findAll();
  
    if (!categorias || categorias.length === 0) {
      return { status: 404, message: "Not found" };
    }
  
    let { limit, fields, page, use_in_menu } = req.body;
  
    // Valores padrão
    page = page || 1;
    limit = parseInt(limit, 10);
  
    if (use_in_menu === undefined || use_in_menu === null) {
      use_in_menu = true;
    }
  
    // Filtragem por use_in_menu
    let dadosCategory = categorias.filter(cats => cats.use_in_menu === use_in_menu);
  
    // Filtro de campos
    dadosCategory = dadosCategory.map(cats => {
      const baseData = { id: cats.id, use_in_menu: cats.use_in_menu };
      if (fields === 'name') {
        return { ...baseData, name: cats.name };
      } else if (fields === 'slug') {
        return { ...baseData, slug: cats.slug };
      } else {
        return { ...baseData, name: cats.name, slug: cats.slug };
      }
    });
  
    // Ignora a paginação se limit for -1
    if (limit === -1) {
      // Retorna todas as categorias
      return { status: 200, message: dadosCategory };
    } else {
      // Define limit padrão como 12, caso limit seja inválido
      if (isNaN(limit) || limit < 1) {
        limit = 12;
      }
  
      // Calcula os índices de fatiamento
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
  
      // Garante que o índice final não ultrapasse o tamanho do array
      if (startIndex >= dadosCategory.length) {
        return { status: 200, message: [] }; // Página solicitada não existe
      }
  
      // Aplica paginação
      dadosCategory = dadosCategory.slice(startIndex, endIndex);
  
      return { status: 200, message: dadosCategory };
    }
  }
 
  
  
  
  async getCategoryById(id) {
    const categoria = await Category.findByPk(id);
    if (!categoria) {
      return { status: 404, message: "Categoria não encontrada" };
    }
    return {
      status: 200,
      message: {
        id: categoria.id,
        name: categoria.name,
        slug: categoria.slug,
        use_in_menu: categoria.use_in_menu,
      },
    };
  }

  async updateCategory(req) {
    const { id } = req.params;
    console.log('Requisição ID:', id);
    console.log('Corpo da requisição:', req.body);
  
    try {
      // Encontra categoria pelo ID :)
      let category = await Category.findByPk(id);
  
      // Verifica se a categoria existe :)
      if (!category) {
        console.log('Categoria não encontrada');
        return { status: 404, message: "Categoria não encontrada." };
      }
  
      // Verifica se o corpo da requisição está presente e se os campos são válidos :)
      const { name, slug, use_in_menu } = req.body;
      if (!name || !slug || use_in_menu === undefined || use_in_menu === null) {
        console.log('Dados inválidos:', { name, slug, use_in_menu });
        return { status: 400, message: "Dados inválidos." };
      }

      // Atualiza a categoria com os novos dados :)
      await category.update(req.body);
  
      return { status: 204, message: "" };
    } catch (error) {
      // Retorna erro do servidor :)
      console.error('Erro do servidor:', error); 
      return { status: 500, message: "Erro do servidor." };
    }
  }
  

  async postCategory(req) {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug || !use_in_menu) {
      return { message: "Todos os campos são obrigatórios", status: 400 };
    }

    const newCategory = { name, slug, use_in_menu };
    await Category.create(newCategory);

    return { message: "categoria criada", status: 201 };
  }


  async deleteCategory(req) {
    const { id } = req.params;
    const categoria = await Category.findByPk(id);
    if (!categoria || categoria == {} || categoria == null) {
      return { message: "categoria não encontrada", status: 404 };
    }
    await Category.destroy({ where: { id } });  
    return { message: "", status: 204 };
  }

}

module.exports = new CategoriesServices();

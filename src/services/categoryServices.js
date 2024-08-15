const Category = require("../models/Category");

class CategoriesServices {
  async getAllCategorys(req) {
    const {
      limit = 12,
      page = 1,
      fields = "name,slug",
      use_in_menu,
    } = req.query;

    const filter = use_in_menu === "true" ? { use_in_menu: true } : {};

    const projection = fields.split(",").join(" ");
    let categories;

    if (limit === "-1") {
      categories = await Category.findAll({
        where: filter,
        attributes: projection,
      });
    } else {
      categories = await Category.findAll({
        where: filter,
        attributes: projection,
        limit: parseInt(limit, 10),
        offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      });
    }

    const dadosCategory = categories.map((cats) => ({
      id: cats.id,
      name: cats.name,
      slug: cats.slug,
    }));

    return {
      message: dadosCategory,
    };
    // const categorias = await Category.findAll();
    // let {limit} = req.body

    // if( limit == '-1'){
    //     let dadosCategory = categorias.map(cats =>({
    //         id: cats.id,
    //         name: cats.name,
    //         slug: cats.slug
    //     }
    // ));
    // return{message : dadosCategory}

    // }else if(limit >= 1){
    //     let count = 0
    //     let dadosCategory = categorias.forEach(element =>{
    //         if(count < limit){
    //             return element
    //         }
    //         count += 1
    //     })
    // }
    // else{
    //     limit = 12
    // };
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

  async postCategory(req) {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug || !use_in_menu) {
      return { message: "Todos os campos são obrigatórios", status: 400 };
    }

    const newCategory = { name, slug, use_in_menu };
    await Category.create(newCategory);

    return { message: "categoria criada", status: 201 };
  }

  async deleteCategory() {
    return { message: "usuario deletado", status: 200 };
  }
}

module.exports = new CategoriesServices();

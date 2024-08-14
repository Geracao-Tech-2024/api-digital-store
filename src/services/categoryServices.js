const Category = require("../models/Category");

class CategoriesServices {
  async getAllCategorys(req){
    const categorias = await Category.findAll();
    let {limit} = req.body

    if( limit == '-1'){
        let dadosCategory = categorias.map(cats =>({
            id: cats.id,
            name: cats.name,
            slug: cats.slug
        }
    ));
    return{message : dadosCategory}


    }else if(limit >= 1){
        let count = 0
        let dadosCategory = categorias.forEach(element =>{
            if(count < limit){
                return element
            }
            count += 1
        })
    }
    else{
        limit = 12
    };
    
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

  async deleteCategory() {
    return { messege: "usuario deletado", status: 200 };
  }
}

module.exports = new CategoriesServices();

const Category = require('../models/Category')

class CategoriesServices{
    async getCategorys(){
        return 'todos os usuarios';
    }

    async getCategoryById(id) {
       
        const categoria = await Category.findByPk(id);
        if (!categoria) {
            
            return { status: 404, message: 'Categoria não encontrada' };
        }
        return {
            status: 200,
            message: {
                id: categoria.id,
                name: categoria.name,
                slug: categoria.slug,
                use_in_menu: categoria.use_in_menu
            }
        };
    }


    async deleteCategory(){
        return {messege: 'usuario deletado', status: 200}
    }
}

module.exports =  new CategoriesServices();
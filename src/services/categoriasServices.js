const user = require('../models/Category')

class CategoriesServices{
    getCategories(){
        return 'todos os usuarios'
    }
    getCategories(){
        return "Categories retornado"
    }
    postCategories(){
        return 'Categories criado'
    }
    putCategories(){
        return 'Categories atualizado'
    }
    deleteCategories(){
        return 'Categories deletado'
    }
}

module.exports =  new CategoriesServices();
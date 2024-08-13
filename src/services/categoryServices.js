const Category = require('../models/Category')

class CategoriesServices{
    async getCategorys(){
        return 'todos os usuarios';
    }
    async deleteCategory(){
        return {messege: 'usuario deletado', status: 200}
    }
}

module.exports =  new CategoriesServices();
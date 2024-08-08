const Category = require('./../models/Category');

class categoryServices {
    getCategorys(){
        return 'todos os categorys'
    }
    getCategory(){
        return 'apenas um category'
    }
    postCategory(){
        return 'category criado'
    }
    putCategory(){
        return 'category atualizado'
    }
    deleteCategory(requisicao){
        const id = requisicao.params.id
        return Category.destroy({
            where: { id: id }
        });

    }
}
module.exports =  new categoryServices();
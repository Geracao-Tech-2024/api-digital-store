const user = require('../models/User')

class UsuarioServices {
    getUsuarios(){
        return 'todos os usuarios'
    }
    
    getUsuario(req){
      const {id} = req.params.id;
      const project = user.findById(id);
      if (user === null){
        return "NOT FOUND"
      
      }else{
        // console.log();
      }
    }
    postUsuario(){
        return 'usuario criado'
    }
    putUsuario(){
        return 'usuario atualizado'
    }
    deleteUsuario(){
        return 'usuario deletado'
    }
}
module.exports =  new UsuarioServices();
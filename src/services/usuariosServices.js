const bcrypt = require('bcrypt');

class UsuarioServices {
    getUsuarios(){
        return 'todos os usuarios'
    }
    getUsuario(){
        return 'apenas um usuario'
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
    createHash (password) {
        return bcrypt.hash(password, 7);
    }
    createHash (password, hash) {
        return user.password = bcrypt.compare(password, hash);
    }
}
module.exports =  new UsuarioServices();
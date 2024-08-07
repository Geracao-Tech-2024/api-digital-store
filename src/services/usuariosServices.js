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
}
module.exports =  new UsuarioServices();
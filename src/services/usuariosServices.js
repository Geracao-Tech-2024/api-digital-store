const bcrypt = require('bcrypt');
const user = require('../models/User')

class UsuarioServices {
  getUsuarios() {
    return 'todos os usuarios'
  }

  getUsuario(req) {
    const { id } = req.params.id;
    const project = user.findById(id);
    if (user === null) {
      return "NOT FOUND"

    } else {
      // console.log();
    }
  }
  postUsuario() {
    return 'usuario criado'
  }
  putUsuario() {
    return 'usuario atualizado'
  }
  deleteUsuario() {
    return 'usuario deletado'
  }
  
  // Retorna uma string
  async criarHash(password) {
    return await bcrypt.hash(password, 7);
  }
  // Retorna um boolean
  async verificarSenha(password, hash) {
    return await bcrypt.compare(password, hash);
  }

}
module.exports = new UsuarioServices();
<<<<<<< HEAD
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
=======
const User = require("./../models/User");
const bcrypt = require('bcrypt');

class UsuarioServices {
  getUsuarios() {
    return "todos os usuarios";
  }

  async getUsuario(req, res) {
    const user = await User.findByPk(req.params.id);
    console.log(user)
    if (!user || user == {}) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
     res.status(200).json(user);
  }


  postUsuario() {
    return "usuario criado";
  }
  putUsuario() {
    return "usuario atualizado";
  }
  deleteUsuario() {
    return "usuario deletado";
  }
  // let senha_criptografada = passwordEncoded();
  async passwordEncoded(password){
    return await bcrypt.hash( password, 7);
  }
  //                                        senha             hash
  // let compare_senha = passwordCompare( 1223123123 , jlkjlukhk123iojheskzça)
  async passwordCompare(password, hashPassword){
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = new UsuarioServices();
>>>>>>> 369ed4def274d2f0ef876a5f9ef5b921fd8e875a

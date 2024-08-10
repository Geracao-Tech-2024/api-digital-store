const User = require("./../models/User");
const bcrypt = require('bcrypt');

class UsuarioServices {
  getUsuarios() {
    return "todos os usuarios";
  }

  async getUsuario(req, res) {
    // const user = await User.findByPk(req.params.id);
    // console.log(user)
    // if (!user || user == {}) {
    //     return res.status(404).json({ message: 'Usuário não encontrado' });
    // }
    //  res.status(200).json(user);
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

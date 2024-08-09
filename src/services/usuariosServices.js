const User = require("../models/User");
const express = require("express");

const router = express.Router();

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
}

module.exports = new UsuarioServices();

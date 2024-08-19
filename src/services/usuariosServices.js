
const { createTokenJWT } = require("../middleware/jwt_alth");

const User = require("./../models/User");
const bcrypt = require("bcrypt");

class UsuarioServices {

  async getUsuario(req) {
    let { id } = req.params;
    const user = await User.findByPk(id);

    if (!user || user == {}) {
      return { status: '404', message: "Usuário não encontrado" };

    } else {
      const dados = {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email
      };

      return { status: '200', message: dados }
    }
  }

  async postUsuario(req, res) {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;


      if (!firstname || !surname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'As senhas não coincidem' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }


      const hashedPassword = await this.passwordEncoded(password);

      const newUser = new User({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });


      await newUser.save();


      return res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {

      return res.status(500).json({ message: 'Erro ao criar o usuário', details: error.message });
    }
  }


  async putUsuario(req) {
    const { id } = req.params;
    const { firstname, surname, email } = req.body;

    try {

      let usuario = await User.findByPk(id);

      if (!firstname && !surname && !email) {
        return { message: "At least one field (firstname, surname, email) is required", status: 400 };
      }

      if (!usuario) {
        return { message: "User not found", status: 404 };
      }
      await usuario.update(req.body);
      return { message: "", status: 204 };

    } catch (error) {
      // Trate erros que possam ocorrer durante a atualização
      return { message: "Bad Request", status: 400 };
    }

  }

  async deleteUsuario(req) {
    try {
      const { id } = req.params
      // Encontra o usuário pelo ID :)
      const user = await User.findByPk(id); // findByPk é usado para encontrar por chave primária :)

      // Verifica se o usuário foi encontrado :)
      if (!user) {
        return { message: 'Usuário não encontrado', status: 404 };
      }

      // Deleta o usuário :)
      await User.destroy({
        where: { id: `${id}` }
      });

      // Retorna mensagem e status de sucesso :)
      return { message: 'Usuário deletado com sucesso', status: 204 };
    } catch (error) {
      // Retorna mensagem e status de erro interno :)
      return { message: 'Erro ao deletar usuário', status: 500 };
    }
  }


  // let senha_criptografada = passwordEncoded();
  async passwordEncoded(password) {
    return await bcrypt.hash(password, 7);
  }

  //                                        senha             hash
  // let compare_senha = passwordCompare( 1223123123 , jlkjlukhk123iojheskzça)
  async passwordCompare(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }

  async gerarToken(req) {
    try {
      let usuario = await User.findOne({ where: { email: `${req.body.email}` } });
      if (usuario.id && usuario.password) {
        let veriifica_senha = await this.passwordCompare(req.body.password, usuario.password);
        if (veriifica_senha) {
          let token = await createTokenJWT(usuario.id);
          console.log(token)
          return { status: 200, messege: { token: token } }
        } else {
          return { status: 400, messege: 'dados incorretos' }
        }

      } else {
        return { status: 400, messege: 'dados incorretos' }
      }
    } catch (error) {
      return { status: 400, messege: 'dados incorretos' }
    }
  }
}
module.exports = new UsuarioServices();

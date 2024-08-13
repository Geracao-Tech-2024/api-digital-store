const { JSON } = require("sequelize");
const User = require("./../models/User");
const bcrypt = require("bcrypt");

class UsuarioServices {
  getUsuarios() {
    return "todos os usuarios";
  }

  async getUsuario(req) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return { status: 404, message: "Usuário não encontrado" };
    }else{
      return {status:'200',message: 'Usuario Encontrado Com Sucesso'}
    }
  }

  postUsuario(req) {
    return new Promise((resolve, reject) => {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      console.log("Request Body:", req.body);

      if (!firstname || !surname || !email || !password || !confirmPassword) {
        return resolve({
          message: "Todos os campos são obrigatórios",
          status: 400,
        });
      }
      if (password !== confirmPassword) {
        return resolve({ message: "As senhas não coincidem", status: 400 });
      }

      User.findOne({ email })
        .then((existingUser) => {
          if (existingUser) {
            return resolve({ message: "Email já está em uso", status: 400 });
          }

          const newUser = new User({
            firstname,
            surname,
            email,
            password,
          });

          return newUser
            .save()
            .then(() =>
              resolve({ message: "Usuário criado com sucesso", status: 201 })
            )
            .catch((error) =>
              resolve({
                message: "Erro ao criar o usuário",
                status: 500,
                details: error.message,
              })
            );
        })
        .catch((error) =>
          resolve({
            message: "Erro ao criar o usuário",
            status: 500,
            details: error.message,
          })
        );
    });
  }


  putUsuario() {
    return "usuario atualizado";
  }
  
  async deleteUsuario(req) {
    try {
      const {id} = req.params
      // Encontra o usuário pelo ID :)
      const user = await User.findByPk(id); // findByPk é usado para encontrar por chave primária :)
  
      // Verifica se o usuário foi encontrado :)
      if (!user) {
        return { message: 'Usuário não encontrado', status: 404 };
      }
  
      // Deleta o usuário :)
      await User.destroy({
        where: { id:`${id}` }
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
}

module.exports = new UsuarioServices();

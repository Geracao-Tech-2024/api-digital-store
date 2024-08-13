
const { createTokenJWT } = require("../middleware/jwt_alth");

const User = require("./../models/User");
const bcrypt = require("bcrypt");

class UsuarioServices {
  getUsuarios() {
    return "todos os usuarios";
  }

  async getUsuario(req) {
    let {id} = req.params;
    const user = await User.findByPk(id);
    console.log(user)
    
    if (!user || user == {}) {
      return { status: '404', message: "Usuário não encontrado" };
    }else{
      const dados = {
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email
      };


      return {status : '200', message: dados}
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
  deleteUsuario() {
    return "usuario deletado";
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
    let usuario = await User.findOne({ where: { email: `${req.body.email}` } });
    if (usuario.id && usuario.password){
      let veriifica_senha = await this.passwordCompare(req.body.password, usuario.password);
      if (veriifica_senha) {
        let token = await createTokenJWT(usuario.id);
        console.log(token)
        return { status: 200, messege: { token: token } }
      }else{
        return { status: 400, messege: 'dados incorretos'}
      }

    }else{
      return { status: 400, messege: 'dados incorretos' }
    }
  }
}
module.exports = new UsuarioServices();

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


  postUsuario(req, res) {
    return new Promise((resolve, reject) => {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      console.log('Request Body:', req.body);

      // Validação dos campos obrigatórios
      if (!firstname || !surname || !email || !password || !confirmPassword) {
        return resolve(res.status(400).json({ message: 'Todos os campos são obrigatórios' }));
      }

      // Validação da correspondência das senhas
      if (password !== confirmPassword) {
        return resolve(res.status(400).json({ message: 'As senhas não coincidem' }));
      }

      // Verificar se o usuário já existe
      User.findOne({ where: { email } })
        .then(existingUser => {
          if (existingUser) {
            return resolve(res.status(400).json({ message: 'Email já está em uso' }));
          }

          // Codificar a senha antes de salvar
          this.passwordEncoded(password)
            .then(hashedPassword => {
              // Criar um novo usuário
              const newUser = new User({
                firstname,
                surname,
                email,
                password: hashedPassword,
              });

              // Salvar o usuário no banco de dados
              return newUser.save()
                .then(() => resolve(res.status(201).json({ message: 'Usuário criado com sucesso' })))
                .catch(error => {
                  console.error('Erro ao criar o usuário:', error);
                  resolve(res.status(500).json({ message: 'Erro ao criar o usuário', details: error.message }));
                });
            })
            .catch(error => {
              console.error('Erro ao codificar a senha:', error);
              resolve(res.status(500).json({ message: 'Erro ao codificar a senha', details: error.message }));
            });
        })
        .catch(error => {
          console.error('Erro ao verificar o usuário:', error);
          resolve(res.status(500).json({ message: 'Erro ao verificar o usuário', details: error.message }));
        });
    });
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

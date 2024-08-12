const User = require("./../models/User");
const bcrypt = require('bcrypt');

class UsuarioServices {
  getUsuarios() {
    return "todos os usuarios";
  }

  async getUsuario(req) {
    const user = await User.findByPk(req.params.id);
    console.log(user)
    if (!user || user.id ) {
        return {status: '404' ,message: 'Usuário não encontrado' };
    }
     return {status:'200',message: "ok"}
  }

  async postUsuario(req, res) {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      console.log('Request Body:', req.body);

      // Validação dos campos obrigatórios
      if (!firstname || !surname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }

      // Validação da correspondência das senhas
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'As senhas não coincidem' });
      }

      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }

      // Codificar a senha antes de salvar
      const hashedPassword = await this.passwordEncoded(password);

      // Criar um novo usuário
      const newUser = new User({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });

      // Salvar o usuário no banco de dados
      await newUser.save();

      // Responder com sucesso
      return res.status(201).json({ message: 'Usuário criado com sucesso' });

    } catch (error) {
      // Tratar erros e responder com uma mensagem de erro
      console.error('Erro ao criar o usuário:', error);
      return res.status(500).json({ message: 'Erro ao criar o usuário', details: error.message });
    }
  }

  

  putUsuario() {
    return "usuario atualizado";
  }
  deleteUsuario() {
    return "usuario deletado";
  }
  // let senha_criptografada = passwordEncoded();
  // Função para codificar a senha
  async passwordEncoded(password) {
    return await bcrypt.hash(password, 7);
  }

  // Função para comparar a senha fornecida com o hash armazenado
  async passwordCompare(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = new UsuarioServices();

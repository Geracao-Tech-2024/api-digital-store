const user = require('../models/User')

class UsuarioServices {
    getUsuarios(){
        return 'todos os usuarios'
    }
    
    getUsuario(req){
      const {id} = req.params.id;
      const project = user.findById(id);
      if (user === null){
        return "NOT FOUND"
      
      }else{
        // console.log();
      }
    }
    postUsuario(req) {
        return new Promise((resolve, reject) => {
            
            const { firstname, surname, email, password, confirmPassword } = req.body;

           
            console.log('Request Body:', req.body);

            
            if (!firstname || !surname || !email || !password || !confirmPassword) {
                return resolve({ message: 'Todos os campos são obrigatórios', status: 400 });
            }
            if (password !== confirmPassword) {
                return resolve({ message: 'As senhas não coincidem', status: 400 });
            }

            
            user.findOne({ email })
                .then(existingUser => {
                    if (existingUser) {
                        return resolve({ message: 'Email já está em uso', status: 400 });
                    }

                    const newUser = new User({
                        firstname,
                        surname,
                        email,
                        password, 
                    });

                    return newUser.save()
                        .then(() => resolve({ message: 'Usuário criado com sucesso', status: 201 }))
                        .catch(error => resolve({ message: 'Erro ao criar o usuário', status: 500, details: error.message }));
                })
                .catch(error => resolve({ message: 'Erro ao criar o usuário', status: 500, details: error.message }));
        });
    }

    putUsuario(){
        return 'usuario atualizado'
    }
    deleteUsuario(){
        return 'usuario deletado'
    }
}
module.exports =  new UsuarioServices();
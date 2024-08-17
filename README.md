## 📋 Requirements

- Node.js (v12 ou posterior)
- npm (v6 ou posterior) ou fio (v1 ou posterior)

## 🔧 Installation

1. Clone o repositório:

```
git clone https://github.com/Geracao-Tech-2024/api-digital-store.git
```

2. Instale as dependências:

```
npm install

```

3. Crie dentro da pasta do projeto clonado o arquivo .ENV, passando estes dados:

```
DB_NAME = railway
DB_USER = root
DB_PASS = NcNqyjbOYKMwCrkfJOYQYXyvtDsgescv
DB_HOST = monorail.proxy.rlwy.net
DB_PORT = 24130
SECRET_JWT = JW_Inglish_or_spanish?T
```

4. Baixe o arquivo sql, que está no projeto, importe-o para dbeaver ou workbench para executar as tabelas ja criadas.

```
arquivoSql.sql
```


5. Execute o servidor de desenvolvimento:

```
npm start
```

## 🛠️  Estrutura do Projeto

```
project-root/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── tests/integracao
├── .env
├── .gitignore
├── package-lock.json
└── package.json

```


## Seção 01 - Criação das tabelas

<details>
   <summary><strong>Criar a tabela de usuários</strong></summary><br>

Criar a tabela de usuários no banco de dados utilizando o Sequelize ORM. A tabela contém as colunas a seguir:

- **id**: Coluna do tipo INTEGER 
- **firstname**: Coluna do tipo STRING 
- **surname**: Coluna do tipo STRING 
- **email**: Coluna do tipo STRING 
- **password**: Coluna do tipo STRING 



        

</details>

<details>
  <summary><strong>Criar a tabela de produtos</strong></summary><br>

 Criar a tabela de produtos no banco de dados utilizando o Sequelize ORM. A tabela contém as colunas a seguir:

- **id**: Coluna do tipo INTEGER 
- **enabled**: Coluna do tipo BOOLEAN 
- **name**: Coluna do tipo STRING 
- **slug**: Coluna do tipo STRING 
- **use_in_menu**: Coluna do tipo BOOLEAN 
- **stock**: Coluna do tipo INTEGER 
- **description**: Coluna do tipo STRING 
- **price**: Coluna do tipo FLOAT 
- **price_with_discount**: Coluna do tipo FLOAT 


</details>

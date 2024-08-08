const Controller = require('./../controller/usuariosController');
const express = require('express');
const user = require('/models/User');

const router = express.Router(); 

router.post('/', async (req,res) =>{
    try{
        const {firstname,email,password} = req.body;
        const user = new User({firstname, email , password});
        await user.save();
        res.status(201)
        console.log("Usuario Criado Com Sucesso")
    } catch(erro){
        res.status(500)
        console.log("Erro")
    }
})
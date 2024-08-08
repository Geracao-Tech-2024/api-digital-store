const Controller = require('./../controller/usuariosController');
const express = require('express');
const user = require('/models/User');

const router = express.Router(); 


router.get('./User/:id', (req,res) =>{
    const{id} = req.params;
    const user = Users.find(user => user.id == id);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(400).send("NOT FOUND!");
    }

});
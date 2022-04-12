//Constantes
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const model=require('./models');


let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.post('/create', async(req, res)=>{
   /* let reqs = await model.User.create({
        'name':req.body.nameUser,
        'password':req.body.passwordUser,
        'email':req.body.emailUser,
        'faculdade':req.body.faculdadeUser,
        'createdAt':new Date(),
        'updatedAt':new Date()
    });*/
    console.log(req.body.nameUser);
});

//Start Server
let port=process.env.PORT || 3000;
app.listen(port,(req,res) =>{
    console.log('Servidor Rodando');
});
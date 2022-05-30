const express = require("express");
const app = express();
const bodyparser =require("body-parser");
const connection = require("./database/database");
const perguntaModel=require("./database/Pergunta");
const pergunta = require("./database/Pergunta");
const RespostaModel = require("./database/Resposta");

//Testando a BD
connection
.authenticate()
.then(()=>{
    console.log("Conexão feita com sucesso!");
})
.catch((msgErro)=>{
    console.log(msgErro);
})
app.set('view engine','ejs');// Estou dizendo para o Express usar o EJS como View engine
app.use(express.static('public'));//para dizer ao express onde esta os arquivos estaticos como :img,css javascript do front
app.use(bodyparser.urlencoded({extended: false}));//
app.use(bodyparser.json());
app.get("/",(req, res) => {
    perguntaModel.findAll({raw:true,order:[
        ['id','desc']
    ]}).then(perguntas =>{
       
        res.render("index",{

            perguntas:perguntas,
        });
        

    });
   
});
app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});
app.post("/salvarpergunta",(req ,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    perguntaModel.create({
      titulo:titulo,
      descricao:descricao
    }).then(()=>{
        res.redirect("/");
    });
   
});
app.get("/pergunta/:id",(req , res)=>{
    var id =req.params.id;
    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta =>{
     if (pergunta !=  undefined) {//achou a pergunta

        RespostaModel.findAll({
            where :{ perguntaId: pergunta.id },
            order:[['id','desc']]
        }).then(respostas=>{
            res.render("pergunta",{
                pergunta: pergunta, 
                respostas: respostas
             });
        });
       
     }else{//nao achou a pergunta
       res.redirect("/");
     }
    });
});

app.post("/responder",(req , res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    RespostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId,

    }).then(()=>{
res.redirect("/pergunta/"+perguntaId);
    })

})
app.listen(300,()=>{console.log("Plataforma Rodando");});

const sequelize = require("sequelize");
const connection = require("./database");

const pergunta = connection.define('perguntas',{
    titulo:{
       type: sequelize.STRING,
       allowNull:false
    } ,
    descricao:{
        type: sequelize.TEXT,
        allowNull:false
    }


});
pergunta.sync({fource:false}).then(()=>{
    console.log("Tabela criado")

});
module.exports= pergunta;
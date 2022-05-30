const sequilize =require('sequelize');
const connection = new sequilize('guiapergunta','root','Isvaldo123',{
    host:'localhost',
    dialect:'mysql'


});
module.exports=connection;
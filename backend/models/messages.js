const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Messages= sequelize.define('messages',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    message: Sequelize.STRING,
    receiverid:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    isgroupmessage: {
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})

module.exports=Messages;
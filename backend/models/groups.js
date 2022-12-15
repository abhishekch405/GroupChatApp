const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Groups= sequelize.define('groups',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name: Sequelize.STRING,
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type: Sequelize.STRING,
        allowNull:false
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=Users;
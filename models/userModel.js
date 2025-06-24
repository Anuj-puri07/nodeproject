const {DataTypes} = require("sequelize")

const makeUserTable = (sequelize, DataTypes)=>{
     const user = sequelize.define("user",{
        fullname :{
            type : DataTypes.STRING
        },
        email :{
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        }
     })
return user
}

module.exports = makeUserTable

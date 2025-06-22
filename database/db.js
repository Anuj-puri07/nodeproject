const {Sequelize,DataTypes} = require("sequelize")

const sequelize = new Sequelize({
    database : "hackathon",
    username : "root",
    password : "",
    host : "localhost",
    port : 3306,
    dialect : "mysql"
})

sequelize.authenticate()
.then(()=>{
    console.log("Connection successful")
})
.catch((err)=>{
    console.log("error while connecting database", err)
})


const db = {}
db.blogs = require("../models/blogModel")(sequelize, DataTypes)
db.users = require("../models/userModel")(sequelize, DataTypes)

//migration code
sequelize.sync({alter: true}).then(() =>{
    console.log("Migrated successfully")
})

module.exports = sequelize
module.exports = db
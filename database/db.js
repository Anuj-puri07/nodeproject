const {Sequelize,DataTypes} = require("sequelize")

const sequelize = new Sequelize({
    database : "hackathons",
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
db.user = require("../models/userModel") (sequelize, DataTypes)
db.blog = require("../models/blogModel") (sequelize, DataTypes)

db.user.hasMany(db.blog) //this is used to describe relations
db.blog.belongsTo(db.user)


//migration code
sequelize.sync({alter: true}).then(() =>{
    console.log("Migrated successfully")
})

module.exports = sequelize
module.exports = db
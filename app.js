const express = require("express")
const app = express()
const {where} = require("sequelize")
const db = require("./database/db")

app.get("/", (req,res)=>{
    res.send("this is first page")
})

app.get("/login", (req,res)=>{
 res.render("auth/login.ejs")
})

app.get("/register", (req,res)=>{
    res.render("auth/register.ejs")
})

app.post("/register", async (req,res) => {
    const{username,email,password,confirm_password} = req.body

    if(password !==confirm_password){
        res.send("password Doesn't match")
    }

    await db.users.create({
        username,
        email,
        password: bcrypt.hashSync(password,10)
    })
    res.send("registered successfully")

})

app.listen(1544, function(){
    console.log("Project is running in pory 1544")
})
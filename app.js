const express = require("express")
const app = express()
const {where} = require("sequelize")
const db = require("./database/db")
const bcrypt = require("bcrypt")
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const middle = require("./middleware/middle")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
app.use(cookieparser())

app.get("/get-blogs", middle, async (req, res) => {
    const userId = req.userId;
    console.log("User ID:", userId);

    const data = await db.blog.findAll({
        where: { 
            userId: userId
         }
    });

    // console.log("Blog Data:", data);
    res.render("blog/get-blogs.ejs", { blog: data });
});

app.get("/", (req,res)=>{
    res.send("this is first page")
})

app.get("/login", (req,res)=>{
 res.render("auth/login.ejs")
})
app.post("/login",async (req,res)=>{
    const {email,password}= req.body
    // login logic ---> check if email exits or not
   const user = await db.user.findAll({
     where : {
        email : email
    }
   })// select * from users where email = entered email.

   if(user.length == 0){
    res.send("User not registered")
   }else{
    //now check password 
    const ispasswordMatched = bcrypt.compareSync(password, user[0].password)
    if(ispasswordMatched){
        const token = jwt.sign({id: user[0].id},"thisisverysecret", {
            expiresIn : "1d"
        })
        
        res.cookie("token",token)
       
        res.redirect("/get-blogs")
    }else{
        res.send("Invalid Credentials")
    }
   }
       
})

app.get("/register", (req,res)=>{
    res.render("auth/register.ejs")
})

app.post("/register", async (req,res) => {
    const{username,email,password,confirmPassword} = req.body

    if(password !==confirmPassword){
        res.send("password Doesn't match")
    }

    await db.user.create({
        fullname : username,
        email,
        password: bcrypt.hashSync(password,10)
    })
    res.send("registered successfully")

})

app.get("/add-blogs",middle, (req,res)=>{
    res.render("blog/add-blogs.ejs")
})
app.post("/add-blogs", middle, async (req,res) =>{
    const userId = req.userId
    
    const {title,subtitle,content,author,publishDate} = req.body

    await db.blog.create({
       title,
       subtitle,
       content,
       author_name: author,
       publish_date: publishDate,
        userId : userId

    })

    res.redirect("/get-blogs")
})

app.get("/get-blogs", middle, (req,res)=>{
    res.render("blog/get-blogs.ejs")
})


app.get("/edit/:id", async (req,res)=>{
    const id= req.params.id
    const blog = await db.blog.findAll({
        where : {
            id : id
        }
    })
    res.render("blog/update-blogs.ejs", {blog: blog}
    )
})

app.post("/edit/:id", middle, async(req,res)=>{
    const id = req.params.id
    const {title, subtitle, content, author, publishDate} = req.body

    await db.blog.update({
        title: title,
        subtitle : subtitle,
        content : content,
        author_name : author,
        publish_date : publishDate
    }, {
        where :{
            id: id
        }
    })
    res.redirect("/get-blogs")
})

app.get("/delete/:id", async(req,res)=>{
    const id = req.params.id
    await db.blog.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/get-blogs")
})

app.listen(3100, function(){
    console.log("Project is running in port 1544")
})
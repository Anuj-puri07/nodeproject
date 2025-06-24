const jwt = require("jsonwebtoken")

const middle = (req,res, next)=> {
       const token = req.cookies.token

    //verify token
    if(!token){
        res.render("auth/login")
    }else{
        jwt.verify(token,"thisisverysecret",
            (error,result)=>{
                if(error){
                    res.send("Invalid token")
                }else{
                    req.userId = result.id
                    // console.log(result)
                    next()
                }
            }
        )
    }
}
module.exports = middle
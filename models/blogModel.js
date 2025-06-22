const makeBlogTable = (sequelize, Datatypes)=>{
const blog =sequelize.define("blog",{
    title: {
        type : Datatypes.STRING
    },
    subtitle:{
        type: Datatypes.STRING
    },
    description: {
        type: Datatypes.STRING
    },
    author : {
        type : Datatypes.STRING
    },
    published_date : {
        type : Datatypes.STRING
    } 
})
return blog
}


module.exports = makeBlogTable
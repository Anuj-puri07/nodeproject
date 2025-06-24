const { DataTypes } = require("sequelize");

const makeBlogTable = (sequelize, DataTypes)=>{
    const blog = sequelize.define("blog", {
        title:{
            type: DataTypes.STRING
        },
        subtitle:{
            type : DataTypes.STRING
        },
        content :{
            type : DataTypes.STRING
        },
        author_name: {
            type : DataTypes.STRING
        },
        publish_date : {
            type : DataTypes.STRING
        }
    })
    return blog
}
    
module.exports = makeBlogTable
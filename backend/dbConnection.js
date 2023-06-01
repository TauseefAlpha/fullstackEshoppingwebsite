const mongoose=require("mongoose")
require("dotenv").config()

const dbstr=process.env.DB_CONNECTION

console.log("databaseString",dbstr)
mongoose.set('strictQuery', true)
const db_connect=()=>{
    mongoose.connect(dbstr,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{console.log("databaseConnected sucessfully-------13")}).catch((error)=>{console.log("connectionFailed",error.message)})

}
// db_connect()

module.exports=db_connect

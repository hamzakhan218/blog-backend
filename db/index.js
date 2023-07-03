const mongoose = require('mongoose')

const connectToDB = async () => {
    // mongoose.connect("mongodb+srv://hamzabashir218:hamzabashir218@cluster0.golz1jd.mongodb.net/").then(()=>{
        mongoose.connect("mongodb+srv://vercel-admin-user:cPwEbe4lfrjz0fbH@cluster0.golz1jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
        console.log("Connection to database is established.")
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = connectToDB;
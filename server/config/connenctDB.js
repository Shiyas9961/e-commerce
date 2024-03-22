const mongoose = require('mongoose')

const connecteDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI)
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    connecteDB
}
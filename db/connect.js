const mongoose = require('mongoose')

const connectDB = async (string) => {
try {
    return mongoose.connect(string, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      })
    
} catch (error) {
    console.log(error)
}
  
}

module.exports = connectDB

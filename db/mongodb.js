const mongoose = require('mongoose');

const mongoDb = async () =>{
 try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB connected');
 } catch (error) {
    console.log('DB conection Error', error);
 }

}

module.exports ={mongoDb}
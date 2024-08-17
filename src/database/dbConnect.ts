import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/url-shortner'

// console.log(process.env)

async  function dbConnect() : Promise<void>{
    try {
        await mongoose.connect(mongoUri);
        if(mongoose.connection.readyState!==1){
            console.log("DB already Connected")
        }
        else{    
            console.log("DB Connected")
        }
    } catch (error) {
        console.error("Error in Connecting DB: ",error)
        process.exit(1)
    }
}

export default dbConnect;
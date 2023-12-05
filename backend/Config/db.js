import mongoose from "mongoose";

const ConnectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`eRROR : ${error.message}`)
            process.exit(1);
    }
}

export default ConnectDB;
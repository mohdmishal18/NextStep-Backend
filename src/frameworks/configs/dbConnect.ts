import mongoose from "mongoose";

const dbURL: string = process.env.MONGO_URI!

if(!dbURL) {
    console.log("MongoDB url is not defined , please make sure to set the mongo uri in the env")
    process.exit(1)
}

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(dbURL,  {dbName: "NextStep"})
        console.log(`MongoDb connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default dbConnect;
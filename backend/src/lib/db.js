import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log("Database connected successfully !!!");
   } catch (err) {
      console.log("Mongo DB connection error: ", err);
   }
};

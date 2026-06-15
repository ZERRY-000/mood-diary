import mongoose from "mongoose";

const uri = process.env.DATABASE;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const connectDB = async () => {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;

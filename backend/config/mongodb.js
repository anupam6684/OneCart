import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URL_LOCAL}/OneCart`)
    .then(() => console.log(`Connected to DB!`));
};

export default connectDb;

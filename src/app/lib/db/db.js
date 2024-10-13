import mongoose from "mongoose";

export const connect = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.error(`Database connection error: ${error.message}`);
      process.exit(1);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

import mongoose from "mongoose";

export class Database {
  constructor() {
    //Promesas
    mongoose
      .connect(process.env.MONGODB_URI || "")
      .then(() => {
        console.log("Se conecto a mongo");
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}

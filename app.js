import express from "express";
import routes from "./routes/index.js";
import connectDb from "./database/mongodb.js";
const app = express();

app.listen(3000, () => {
  console.log("Server started on 3000");
});
// use middlewares to access body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection (mongodb)
await connectDb();

// register routes
app.use("/", routes);

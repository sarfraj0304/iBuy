const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { UserRouter } = require("./routes/User.routes");
const { ProductRouter } = require("./routes/Product.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
const config = {
  origin: "http://www.localhost:8080",
  optionsSuccessStatus: 200,
};
app.use(cors(config));
app.use("/user", UserRouter);
app.use("/product", ProductRouter);

app.listen(process.env.PORT || "4500", async () => {
  try {
    await connection;
    console.log("Mongodb is Connected");
  } catch (error) {
    console.log({ error: error });
  }
  console.log(`Server is Connected to ${process.env.PORT || "4500"}`);
});

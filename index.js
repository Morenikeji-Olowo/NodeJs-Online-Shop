import express from "express";
import { adminRouter } from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { fileURLToPath } from "url";
import path from "path";
import get404Page from "./controllers/error.js";
import mongoose from "mongoose";
import User from "./model/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("69ce4e3d92db466b13483b6d")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(get404Page);

mongoose
  .connect(
    "mongodb+srv://keji:Kaduna500%24@cluster0.igzxz6c.mongodb.net/shop?appName=Cluster0",
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Keji",
          email: "dH4Xb@example.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

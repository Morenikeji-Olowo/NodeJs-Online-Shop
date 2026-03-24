import express from "express";
import { adminRouter } from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { fileURLToPath } from "url";
import path from "path";
import get404Page from "./controllers/error.js";
import database from "./util/database.js";
import User from "./model/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById(1)
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

database.mongoConnect(()=>{
  app.listen(3000);
})

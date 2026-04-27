import express from "express";
import { adminRouter } from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { fileURLToPath } from "url";
import path from "path";
import get404Page from "./controllers/error.js";
import mongoose from "mongoose";
import User from "./model/User.js";
import authRouter from "./routes/auth.js";
import session from "express-session";
import mongodbStore from "connect-mongodb-session";
import csurf from "csurf";
import flash from "connect-flash";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const MongoDBStore = mongodbStore(session);

const MONGODB_URI =
  "mongodb+srv://keji:Kaduna500%24@cluster0.igzxz6c.mongodb.net/shop";
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csurf();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret:
      "mysecrettttttttttttttidjifjidfoickldcjhndmlcmdjcocndicjncjodjcshidjudocihduchudinindvoidivv",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csurfToken = req.csrfToken();
  next();
});
app.use("/admin", adminRouter);
app.use(shopRouter);
app.use("/auth", authRouter);

app.use(get404Page);

mongoose
  .connect(
    "mongodb+srv://keji:Kaduna500%24@cluster0.igzxz6c.mongodb.net/shop?appName=Cluster0",
  )
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

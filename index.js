import express from "express";
import { adminRouter } from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { fileURLToPath } from "url";
import path from "path";
import get404Page from "./controllers/error.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.set("view engine", "pug");
app.set("views", "views");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use(shopRouter);


app.use(get404Page)

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

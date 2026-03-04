import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const products = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) =>{
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
}
class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}

export default Product;

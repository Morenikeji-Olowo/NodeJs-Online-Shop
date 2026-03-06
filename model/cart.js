import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const p = path.join(__dirname, "..", "data", "cart.json");

class Cart {
  // Add product to cart
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);
        if (!cart.products) cart.products = [];
        if (!cart.totalPrice) cart.totalPrice = 0;
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      if (existingProduct) {
        existingProduct.qty += 1;
        cart.products[existingProductIndex] = existingProduct;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalPrice += Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.log(err);
      });
    });
  }

  // Delete product from cart
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err || fileContent.length === 0) return;

      const cart = JSON.parse(fileContent);
      if (!cart.products || cart.products.length === 0) return;

      const product = cart.products.find(prod => prod.id === id);
      if (!product) return;

      const productQty = product.qty;
      cart.products = cart.products.filter(prod => prod.id !== id);
      cart.totalPrice -= Number(productPrice) * productQty;

      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.log(err);
      });
    });
  }

  // Get cart products
  static getProducts(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err || fileContent.length === 0) {
        cb({ products: [], totalPrice: 0 });
      } else {
        let cart = JSON.parse(fileContent);
        if (!cart.products) cart.products = [];
        if (!cart.totalPrice) cart.totalPrice = 0;
        cb(cart);
      }
    });
  }
}

export default Cart;
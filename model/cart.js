import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const p = path.join(__dirname, "..", "data", "cart.json");

class Cart {
  static addProduct(id, productPrice) {
    // Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);

        // Ensure properties exist
        if (!cart.products) {
          cart.products = [];
        }
        if (!cart.totalPrice) {
          cart.totalPrice = 0;
        }
      }

      // Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;

        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;

      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      // Update total price
      cart.totalPrice = cart.totalPrice + Number(productPrice);

      // Save updated cart
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
}

export default Cart;
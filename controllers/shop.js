import path from "path";
import Product from "../model/product.js";

const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "Shop",
      path: "/products",
      hasProducts: products.length > 0,
    });
  });

};

const getOrders = (req, res, next)=>{
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}
const getIndexPage = (req, res, next)=>{
    Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
    });
  });
}

const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};


const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  })
}
const productsController = {
  getProducts,
  getIndexPage,
  getCart,
  getCheckout,
  getOrders

};

export default productsController;

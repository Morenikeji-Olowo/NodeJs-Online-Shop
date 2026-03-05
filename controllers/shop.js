import path from "path";
import Product from "../model/product.js";
import Cart from "../model/cart.js";

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

const getProduct = (req, res, next)=>{
  const prodId = req.params.productId;
  Product.findById(prodId, (product)=>{
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
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

const postCart = (req, res, next) =>{
  const productId = req.body.productId;
  Product.findById(productId, (product) =>{
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart');
}


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
  getProduct,
  getOrders,
  postCart

};

export default productsController;

import path from "path";
import Product from "../model/product.js";
import Cart from "../model/cart.js";
import { where } from "sequelize";
import CartItem from "../model/cart-item.js";
import Order from "../model/order.js";
import OrderItem from "../model/order-item.js";

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOrders = (req, res, next) => {
  req.user.getOrders({include: ["products"]})
  .then((orders)=>{
      console.log(orders)

    res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: orders
  });
  })
  .catch((err)=>{
    console.log(err)
  })
};
const getIndexPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        const oldQuantity = product["cart-item"].quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        })
      }
      return Product.findByPk(productId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

const postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts({where: {id: productId}});
  })
  .then((products)=>{
    const product = products[0];
    return product['cart-item'].destroy();
  })
  .then((result)=>{
    res.redirect("/cart");
  })
  .catch((err)=>{
    console.log(err);
  })
};

 const postOrder = (req, res, next) =>{
  let fetchedCart;
  req.user.getCart()
  .then((cart)=>{
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then((products)=>{
    return req.user.createOrder()
    .then((order)=>{
      order.addProducts(products.map((product)=>{
        product.orderItem = {
           quantity: product['cart-item'].quantity
        }
        return product;
      }))
    })
    .catch((err)=>{
      console.log(err);
    })
  })
  .then((result)=>{
    return fetchedCart.setProducts(null);
  })
  .then((result)=>{
    res.redirect("/orders");
  })
  .catch((err)=>{
    console.log(err);
  })
 }

const productsController = {
  getProducts,
  getIndexPage,
  getCart,
  getCheckout,
  getProduct,
  getOrders,
  postCart,
  postCartDeleteProduct,
  postOrder
};

export default productsController;

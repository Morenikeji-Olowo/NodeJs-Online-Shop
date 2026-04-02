import Product from "../model/Product.js";

const getProducts = (req, res, next) => {
  Product.find()  
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
  req.user.getOrders()
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
    .then((products) => {
        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
        });
      })
    .catch((err) => {
      console.log(err);
    });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
  .then((product)=>{
    return req.user.addToCart(product);
  }).then((result)=>{
    console.log(result);
    res.redirect("/cart");
  })

};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

const postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.deleteCartItem(productId)
  .then((result)=>{
    res.redirect("/cart");
  })
  .catch((err)=>{
    console.log(err);
  })
};

 const postOrder = (req, res, next) =>{
  req.user.addOrder()
  .then((result)=>{
    res.redirect('/orders');
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

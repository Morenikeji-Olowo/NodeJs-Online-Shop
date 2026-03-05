import Product from "../model/product.js";

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: true
  });
};

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
    });
  });
}

const adminController = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct
}

export default adminController;

import { where } from "sequelize";
import Product from "../model/product.js";

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === "true";
  const prodId = req.params.productId;

  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAddProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(price, imageUrl, title, description, null, req.user._id);
  product
    .save()
    .then((result) => {
      console.log("Product created successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  const product = new Product(
    updatedPrice,
    updatedImageUrl,
    updatedTitle,
    updatedDescription,
  )

    .then((result) => {
      console.log("Product updated successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        hasProducts: products.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(() => {
      console.log("Deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};


const adminController = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};

export default adminController;

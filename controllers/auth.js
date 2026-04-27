import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  const message = req.flash("error");
  console.log(req.flash("error"));
  res.render("auth/login", {
    path: "/auth/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: message[0],
  });
};

export const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        console.log("flash set");
        return res.redirect("/auth/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = {
              _id: user._id.toString(),
              name: user.name,
              email: user.email,
              cart: {
                items: user.cart.items.map((item) => ({
                  productId: item.productId.toString(),
                  quantity: item.quantity,
                })),
              },
            };
            return req.session.save((err) => {
              console.log(err);
              return res.redirect("/");
            });
          }
          res.redirect("/auth/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/auth/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    console.log("user logged out successfully");
    res.redirect("/");
  });
};

export const getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};
export const postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.redirect("/auth/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          if (!result) return;
          res.redirect("/auth/login");
        });
    })
    .catch((err) => console.log(err));
};
const authController = {
  getLogin,
  postLogout,
  postLogin,
  getSignUp,
  postSignUp,
};
export default authController;

import database from "../util/database.js";
import mongodb, { ObjectId } from "mongodb";

class User{
    constructor(name, email, cart, id){
        this.name = name;
        this.email = email;
        this.cart = cart;
        this.id = id;
    }
    save(){
        const db = database.getDb();
        return db.collection("users").insertOne(this)
    }

    addToCart(product){
        // const cartProdcut = this.cart.items.findIndex((cp)=>{
        //     return cp._id === product._id;
        // })
        const updatedCart = {
            items: [{...product, quantity:1}],
        }
        const db = database.getDb();
        return db.collection("users").updateOne(
            { _id: new ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )

    }
    static findById(id){
        const db = database.getDb();
        return db.collection("users").find({
            _id: new ObjectId(id)
        })
        .then((user)=>{
            console.log(user);
            return user;
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

 }

 export default User

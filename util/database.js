import mongodb from "mongodb";
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callBack) => {
  mongoClient
    .connect("mongodb+srv://keji:Kaduna500%24@cluster0.igzxz6c.mongodb.net/?appName=Cluster0")
    .then((client) => {
      _db = client.db();
      console.log("Connected to Database");
      callBack();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("No database found");
  }
};

const database = {
  getDb,
  mongoConnect
}
export default database;
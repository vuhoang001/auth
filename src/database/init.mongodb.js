const mongoose = require("mongoose");

const {
  db: { host, port, name },
} = require("../configs/mongodb.config");

const connecString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connecString, {
        maxPoolSize: 10,
      })
      .then((_) => {
        console.log(
          `Connected mongodb success ::: ${port} ::: ${name} ::: ${host}`
        );
      })
      .catch((err) => {
        console.log(`Error connect::: ${err}`);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

module.exports = instanceDatabase;

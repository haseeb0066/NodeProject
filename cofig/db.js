const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongonDB connnected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log("Error received DB connection ===>  ", error);
    process.exit(1);
  }
};

module.exports = ConnectDB;

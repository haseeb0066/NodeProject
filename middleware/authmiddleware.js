const jwt = require("jsonwebtoken");
const errorHandler = require("express-async-handler");
const User = require("../models/userModel");

const ProtectAuth = errorHandler(async (req, res, next) => {
  let token;
  //=============== check  token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //======= Verify and decode token =========
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //======= get user from token =========
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log("Error ==> ", err);
      res.status(401);
      throw new Error("Un authorized");
    }
  }
  //========= no token ========
   
});

module.exports = {
  ProtectAuth,
};

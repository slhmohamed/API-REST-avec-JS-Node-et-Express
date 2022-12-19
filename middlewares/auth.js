const asyncHandler = require("express-async-handler");
 const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { tokenInfo } = require("../config");

const {
    UnauthorizedError,
    AccessTokenError,
  } = require("../middlewares/apiError");
 
const UserRepo = require("../repositories/userRepo");

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
     if (req.headers.authorization) {
      token = req.headers.authorization ;
     }
    if (!token) {
      throw new AccessTokenError("No token provided");
    }
  
    const decoded = await promisify(jwt.verify)(token, tokenInfo.secret);
    const freshUser = await UserRepo.findById(decoded.id);
    if (!freshUser) {
      throw new UnauthorizedError(
        "The user belonging to this token does no longer exist."
      );
    }
    req.user = freshUser;
    next();
  });
const {
    UnauthorizedError,
   } = require("../middlewares/apiError");
 
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
 
      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError(
          "You do not have permission to perform this action"
        );
      }
      next();
    };
  };
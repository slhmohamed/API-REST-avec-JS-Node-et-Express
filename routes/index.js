 const router = require("express").Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

router.use("/",authRoutes);
router.use("/users",userRoutes)


module.exports = router;

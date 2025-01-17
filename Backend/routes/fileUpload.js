const express = require("express");
const router = express.Router();

const {imageUpload,fetchUserData} = require("../controller/fileUpload");

router.post("/imageUpload",imageUpload );
router.get("/fetchUserData", fetchUserData);


module.exports = router;
const express = require("express");
const router = express.Router();

require("../db/conn");

const authentication = require("../middleware/authentication");

router.post("/applyJob",authentication, async (req, res)=>{
    console.log(req.body);
})

module.exports = router;
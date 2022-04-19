const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");

// 게시글 불러오기
router.get("/", mainController.get);


module.exports = router;

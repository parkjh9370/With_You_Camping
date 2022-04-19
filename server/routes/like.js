const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like");

// 좋아요 추가
router.post("/:id", likeController.post);

// 좋아요 취소
router.delete("/:id", likeController.remove);

module.exports = router;

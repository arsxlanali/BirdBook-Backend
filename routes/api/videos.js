const express = require("express");
const router = express.Router();
const videoController = require("../../controllers/videoController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(videoController.getAllVideos)
  .post(verifyRoles(ROLES_LIST.Admin), videoController.addNewVideo)
  .delete(verifyRoles(ROLES_LIST.Admin), videoController.deleteVideo);

module.exports = router;

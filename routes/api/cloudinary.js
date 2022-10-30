const express = require("express");
const router = express.Router();
const cloudinaryController = require("../../controllers/cloudinaryController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/getSignature")
  .get(verifyRoles(ROLES_LIST.Admin), cloudinaryController.getSignature);

// router
//   .route("/uploadImg")
//   .get(verifyRoles(ROLES_LIST.Admin), cloudinaryController.uploadImg);

module.exports = router;

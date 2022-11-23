const express = require("express");
const router = express.Router();
const articleController = require("../../controllers/articleController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(articleController.getAllArticles)
  .post(verifyRoles(ROLES_LIST.Admin), articleController.createNewArticle)
  .delete(verifyRoles(ROLES_LIST.Admin), articleController.deleteArticle);

// router.route("/:id").get(employeesController.getEmployee);

module.exports = router;

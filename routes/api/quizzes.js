const express = require("express");
const router = express.Router();
const quizzesController = require("../../controllers/quizzesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  // .get(quizzesController.getAllQuestions)
  .post(verifyRoles(ROLES_LIST.Admin), quizzesController.createNewQuestion)
  .put(verifyRoles(ROLES_LIST.Admin), quizzesController.updateQuestion)
  .delete(verifyRoles(ROLES_LIST.Admin), quizzesController.deleteQuestion);

router.route("/getAll").post(quizzesController.getAllQuestions);
router.route("/result").get(quizzesController.getResult);
router.route("/:id").get(quizzesController.getQuestion);

module.exports = router;

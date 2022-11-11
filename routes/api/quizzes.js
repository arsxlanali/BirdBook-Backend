const express = require("express");
const router = express.Router();
const quizzesController = require("../../controllers/quizzesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(quizzesController.getAllQuestions)
  .post(quizzesController.createNewQuestion)
  .put(quizzesController.updateQuestion)
  .delete(quizzesController.deleteQuestion);

router.route("/result").get(quizzesController.getResult);
router.route("/:id").get(quizzesController.getQuestion);

module.exports = router;

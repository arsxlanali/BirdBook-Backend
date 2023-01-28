const express = require("express");
const router = express.Router();
const podcastController = require("../../controllers/podcastController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(podcastController.getAllPodcasts)
  .post(verifyRoles(ROLES_LIST.Admin), podcastController.createNewPodcast)
  .delete(verifyRoles(ROLES_LIST.Admin), podcastController.deletePodcast);

// router.route("/:id").get(employeesController.getEmployee);

module.exports = router;

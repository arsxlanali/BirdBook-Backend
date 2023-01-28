const express = require("express");
const router = express.Router();
const AdvertisementController = require("../../controllers/AdvertisementController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(AdvertisementController.getAllAdvertisements)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    AdvertisementController.createNewAdvertisement
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    AdvertisementController.deleteAdvertisement
  );

// router.route("/:id").get(employeesController.getEmployee);

module.exports = router;

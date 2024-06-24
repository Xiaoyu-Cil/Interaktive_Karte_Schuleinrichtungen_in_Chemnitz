const express = require("express");
const router = express.Router();
const facilityController = require("../controllers/facility.controller");

router.get("/all", facilityController.all_facility);
router.get("/category/:category", facilityController.get_facility_by_category);
router.get("/:id", facilityController.get_facility_by_id);
router.get("/art/:artType", facilityController.get_facility_by_art);

module.exports = router;

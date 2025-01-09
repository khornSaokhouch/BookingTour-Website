import express from "express";
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
} from "../../controllers/company-controllers/addpaackage-controllers.js";

const router = express.Router();

// Create a new tour
router.post("/", createTour);

// Get all tours
router.get("/", getAllTours);

// Get a single tour by ID
router.get("/:id", getTourById);

// Update a tour
router.put("/:id", updateTour);

// Delete a tour
router.delete("/:id", deleteTour);

export default router;

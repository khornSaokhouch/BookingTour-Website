import {Tour} from "../../model/packageTour.js";

// Create a new tour
export const createTour = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      maxGroupSize,
      category,
      country,
      createdBy,
      mainImage,
      galleryImages,
    } = req.body;

    const newTour = new Tour({
      name,
      description,
      price,
      duration,
      maxGroupSize,
      category,
      country,
      createdBy,
      mainImage,
      galleryImages,
    });

    await newTour.save();
    res.status(201).json({ success: true, data: newTour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate("category country createdBy");
    res.status(200).json({ success: true, data: tours });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single tour by ID
export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id).populate("category country createdBy");
    if (!tour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a tour
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }
    res.status(200).json({ success: true, data: updatedTour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (!deletedTour) {
      return res.status(404).json({ success: false, error: "Tour not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



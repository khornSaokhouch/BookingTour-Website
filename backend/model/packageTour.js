import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days or hours, depending on your use case
    maxGroupSize: { type: Number, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    country: { type: mongoose.Types.ObjectId, ref: "Country", required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    mainImage: { type: String, required: true }, // URL or file path
    galleryImages: { type: [String], default: [] }, // Array of URLs or file paths
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
export { Tour };

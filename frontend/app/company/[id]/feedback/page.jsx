// ImageUploader.js
"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const { image, isLoading, error, uploadImage } = useAuthStore();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadImage(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {image && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={image}
            alt="Uploaded"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

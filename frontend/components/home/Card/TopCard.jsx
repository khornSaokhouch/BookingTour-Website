import React, { useState, useEffect } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa"; // Importing a star icon from react-icons

const TopCard = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/destinations"); // Use your mock API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCardsData(data); // Assuming the API returns an array of destination objects
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-20">
      <h1 className="text-3xl text-center font-bold py-5">Top Destinations</h1>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="max-w-sm h-[450px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105"
          >
            <img
              className="w-full h-[340px] object-cover"
              src={card.image}
              alt={card.destination}
            />
            <div className="p-4 flex-grow flex flex-col">
              <FaMapMarkerAlt className="text-black mr-1" />
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{card.destination}</h2>
                <span className="text-2xl font-semibold text-gray-800">
                  {card.price}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{card.duration}</p>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-500 mr-1" /> {/* Star icon */}
                <span className="text-gray-700">3.5</span> {/* Rating */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center p-6">
        <button className="bg-blue-500 px-3 text-white font-semibold py-2 rounded hover:bg-blue-600">
          See More
        </button>
      </div>
    </div>
  );
};

export default TopCard;
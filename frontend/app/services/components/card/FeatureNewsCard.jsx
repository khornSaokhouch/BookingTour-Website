import React, { useState, useEffect } from 'react';

const FeatureNewsCard = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/featureNews"); // Use your mock API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setNewsItems(data); // Assuming the API returns an array of news objects
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
    <div className="container px-4 sm:px-6 lg:px-20 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold relative z-10">Feature News</h2>
        <div className="flex">
          <button className="text-gray-600 hover:text-gray-800 transition mx-2 py-2 px-4 border-2">
            &#60; {/* Left Arrow */}
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition mx-2 py-2 px-4 border-2">
            &#62; {/* Right Arrow */}
          </button>
        </div>
      </div>

      {/* Grid layout for 3 cards in one line */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-[240px] object-cover"
            />
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <a href="#" className="inline-block text-blue-500 font-medium hover:underline">
                See more
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center py-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full cursor-pointer"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full cursor-pointer"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default FeatureNewsCard;
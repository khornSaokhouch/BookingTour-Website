'use client';

import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Localculture () {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3002/historical"); // Updated API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setAttractions(data); // Assuming the API returns an array of attraction objects
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
        <div className="px-4 sm:px-6 lg:px-20 py-8">
            <h1 className="text-4xl font-bold p-2 mt-5 text-center my-4">We Offer Best Popular Local culture  place</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {attractions.map((attraction, index) => (
                    <div key={index} className="border rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:scale-105">
                        <img src={attraction.image} alt={attraction.title} className="w-full h-[300px] object-cover" />
                        <i className="fas fa-heart absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full shadow-md cursor-pointer hover:text-red-600"></i>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                                    <span className="text-sm text-gray-500">{attraction.reviews}</span>
                                </div>
                                <span className="text-lg font-bold">{attraction.price}</span>
                            </div>
                            <h2 className="text-lg font-semibold mt-2">{attraction.title}</h2>
                            <p className="text-gray-500">{attraction.duration}</p>
                            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

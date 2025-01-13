import React from 'react';

const Services = () => {
    const serviceData = [
        {
            icon: '📚', // Replace with actual icon
            title: 'Local Culture',
            description: 'Built Wicket longer admire do barton vanity itself do it.',
        },
        {
            icon: '✈️', // Replace with actual icon
            title: 'Local Historical Sites',
            description: 'Engrossed listening, Park gate sell they west hard for the.',
        },
        {
            icon: '🎤', // Replace with actual icon
            title: 'Local Events',
            description: 'Barton vanity itself do it. Preferred to men it engrossed listening.',
        },
    ];

        return (
            <div className="px-10 bg-white py-5">
                <h1 className="text-4xl font-bold text-center mb-6">We Offer Best Services</h1>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 ">
                    {serviceData.map((service, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105"
                            style={{ width: '300px', height: '280px' }} // Set fixed dimensions
                        >
                            <div className="text-6xl mb-4">{service.icon}</div>
                            <h2 className="text-2xl font-semibold">{service.title}</h2>
                            <p className="text-gray-600 text-lg">{service.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Services;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

const FAQSection = () => {
    return (
        <div className="flex justify-center items-center px-20">
            <div className="p-8 w-full md:w-3/4 ">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Frequently Asked Questions <FontAwesomeIcon icon={faSmile} />
                </h2>

                <div className="space-y-6 ">
                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">What are the most popular tourist attractions in [City/Country]?</h3>
                        <p>The most popular attractions include [list of famous places, etc.].</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">What is the best time of year to visit [destination]?</h3>
                        <p>The best time to visit is during [specific months], when the weather is most favorable for outdoor activities.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">Are there guided tours available for specific attractions?</h3>
                        <p>Yes, we offer guided tours for many attractions, such as [specific attractions].</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">Are there any free walking tours available?</h3>
                        <p>Yes, there are free walking tours available, but tips are appreciated if you enjoy the experience!</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">How much do guided tours typically cost?</h3>
                        <p>Our prices vary depending on the tour. Please check our pricing page for details.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">Can you recommend the best local food experiences?</h3>
                        <p>Check out [specific local dishes or restaurants] for authentic recommendations.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">What are the transportation options for getting around the city?</h3>
                        <p>Transportation options include public transit, taxis, rideshares, and bikes.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">What are the activities to do in [City]?</h3>
                        <p>Top activities include exploring local cuisine, visiting cultural sites, and enjoying outdoor activities.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">Are there any kid-friendly or family-friendly activities?</h3>
                        <p>Yes, there are various family-friendly activities such as parks, museums, and more.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">How do I book a tour in advance?</h3>
                        <p>You can book a tour directly on our website by selecting your desired experience.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">Are there any cultural customs or etiquette I should be aware of?</h3>
                        <p>Yes, be mindful of [specific customs], such as greetings and dining etiquette.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h3 className="font-semibold">Do I need to know any specific language phrases for my trip?</h3>
                        <p>Knowing basic phrases like "hello," "please," and "thank you" will be appreciated.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
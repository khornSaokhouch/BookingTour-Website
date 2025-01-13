import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="flex justify-center items-center px-20">
            <div className=" p-8 w-full md:w-3/4  ">
                <h1 className="text-4xl font-bold text-center mb-8">Our Privacy Policy</h1>

                <h2 className="text-2xl font-semibold mt-4">Introduction</h2>
                <p>
                    Welcome to Booking Vacation Tour. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
                </p>

                <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
                <p>
                    We may collect personal information such as your name, email address, and phone number when you visit our site or subscribe to our newsletter.
                </p>

                <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
                <p>
                    We use your information to provide our services, including booking and customer support, and to improve our offerings based on user feedback.
                </p>

                <h2 className="text-2xl font-semibold mt-4">How We Share Your Information</h2>
                <p>
                    We may share your information with trusted partners who help us operate our website or conduct our business, as well as in the following cases:
                </p>
                <ul className="list-disc ml-6">
                    <li>With your consent.</li>
                    <li>When we believe release is appropriate to comply with the law.</li>
                    <li>To protect our rights and the rights of others.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-4">Data Security</h2>
                <p>
                    We take data security seriously and use industry-standard measures to ensure absolute security.
                </p>

                <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
                <p>
                    You have the right to access your personal information and request changes or deletions as outlined by applicable laws.
                </p>

                <h2 className="text-2xl font-semibold mt-4">Third-Party Links</h2>
                <p>
                    Our services may contain links to third-party websites. We are not responsible for the privacy practices of these websites, and we encourage you to review their policies.
                </p>

                <h2 className="text-2xl font-semibold mt-4">Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
                </p>

                <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
                <p>
                    If you have any questions or concerns about our Privacy Policy, please contact us at:
                </p>
                <ul className="list-disc ml-6">
                    <li>Email: contact@bookingvacation.com</li>
                    <li>Phone: +65 486 738 885</li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
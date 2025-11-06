import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Get In Touch</h1>
                <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Whether it's a question, a suggestion, or just to say hi!</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-brand-light p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                        <input type="email" placeholder="Your Email" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                        <textarea placeholder="Your Message" rows={5} className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"></textarea>
                        <button type="submit" className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-amber-500">
                            Submit
                        </button>
                    </form>
                </div>

                {/* Contact Info & Map */}
                <div className="space-y-8">
                     <div className="bg-brand-light p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="space-y-3 text-gray-700">
                            <p><strong>Address:</strong> 123 Fry Lane, Spudville, ST 54321</p>
                            <p><strong>Phone:</strong> (555) 123-4567</p>
                            <p><strong>Email:</strong> contact@potatoandfriends.com</p>
                        </div>
                         <div className="mt-4 border-t pt-4">
                             <h3 className="font-bold">Hours of Operation</h3>
                             <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
                             <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
                         </div>
                    </div>
                    <div className="bg-gray-300 h-64 rounded-lg shadow-lg flex items-center justify-center text-gray-500">
                        [ Interactive Map Placeholder ]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

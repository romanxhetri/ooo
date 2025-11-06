
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-lg font-bold">Potato & Friends</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand-orange transition-colors">About Us</a>
                        <a href="#" className="hover:text-brand-orange transition-colors">Careers</a>
                        <a href="#" className="hover:text-brand-orange transition-colors">Contact</a>
                    </div>
                    <p className="text-sm text-gray-400 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Potato & Friends. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
    
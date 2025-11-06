import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Potato & Friends</h3>
                        <p className="text-gray-400">Serving happiness, one loaded fry at a time.</p>
                        <div className="flex space-x-4 mt-4">
                            {/* Social Media Icons - Placeholders */}
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"></path></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg>
                            </a>
                             <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.218 3.791 4.66- minorities-.4.83.082 1.25.145-.69.18-1.42.26-2.16.26-.305 0-.6-.03-.89-.086.63 1.88 2.448 3.245 4.604 3.282-1.625 1.27-3.67 2.02-5.89 2.02-.38 0-.76-.023-1.13-.066 2.099 1.35 4.59 2.14 7.29 2.14 8.74 0 13.52-7.25 13.52-13.52 0-.21 0-.41-.015-.61.932-.67 1.73-1.51 2.37-2.45z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><button className="hover:text-white text-left">Home</button></li>
                            <li><button className="hover:text-white text-left">Menu</button></li>
                            <li><button className="hover:text-white text-left">Reservations</button></li>
                            <li><button className="hover:text-white text-left">About Us</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Fry Lane, Spudville</li>
                            <li>contact@potatoandfriends.com</li>
                            <li>(555) 123-4567</li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-semibold mb-4">Newsletter</h4>
                         <p className="text-gray-400 mb-2">Get updates on new items and special offers!</p>
                         <form className="flex">
                            <input type="email" placeholder="Your Email" className="w-full p-2 rounded-l-md text-gray-800 focus:outline-none" />
                            <button type="submit" className="bg-brand-orange p-2 rounded-r-md font-bold">Go</button>
                         </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Potato & Friends. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

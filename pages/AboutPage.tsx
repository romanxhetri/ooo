import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
    const { teamMembers } = useData();
    const chef = teamMembers.find(m => m.role.toLowerCase().includes('chef'));

    return (
        <div className="bg-brand-light">
            {/* Story Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.7 }}
                            className="text-4xl md:text-5xl font-extrabold text-brand-dark"
                        >
                            Our Story: More Than Just Fries
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="mt-6 text-lg text-gray-700 leading-relaxed"
                        >
                           Potato & Friends was born from a simple yet profound love for the humble potato. We saw a world of possibilities in every spud, a canvas for culinary creativity. Our journey began in a small kitchen with a single deep fryer and an obsession with crafting the perfect fry: crispy on the outside, fluffy on the inside.
                        </motion.p>
                         <motion.p 
                            initial={{ opacity: 0, x: -50 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="mt-4 text-lg text-gray-700 leading-relaxed"
                        >
                            Today, we've grown, but our core philosophy remains unchanged. We source the finest local potatoes, create our signature sauces from scratch, and aren't afraid to push the boundaries of flavor. We're not just serving food; we're serving happiness, one loaded fry at a time.
                        </motion.p>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <img src="https://picsum.photos/seed/our-team/600/700" alt="Potato & Friends team" className="rounded-lg shadow-2xl"/>
                    </motion.div>
                </div>
            </div>

            {/* Chef Section */}
            {chef && (
                <div className="bg-cream py-20">
                    <div className="container mx-auto px-4 text-center">
                         <h2 className="text-4xl font-extrabold text-brand-dark">Meet the Mastermind</h2>
                         <div className="mt-10 max-w-sm mx-auto bg-white rounded-lg shadow-xl p-6">
                            <img src={chef.imageUrl} alt={chef.name} className="w-32 h-32 rounded-full mx-auto -mt-20 border-8 border-cream object-cover" />
                            <h3 className="text-2xl font-bold mt-4">{chef.name}</h3>
                            <p className="text-brand-orange font-semibold">{chef.role}</p>
                            <p className="mt-2 text-gray-600 italic">"{chef.bio}"</p>
                         </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default AboutPage;

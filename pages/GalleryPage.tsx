import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const GalleryPage: React.FC = () => {
    const { galleryImages } = useData();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-brand-orange text-glow">A Feast for Your Eyes</h1>
                 <p className="mt-4 text-lg text-gray-600">Explore the vibrant atmosphere and mouth-watering dishes of Potato & Friends.</p>
            </div>
            
            <motion.div 
                className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {galleryImages.map(image => (
                    <motion.div 
                        key={image.id} 
                        className="overflow-hidden rounded-lg shadow-lg relative group break-inside-avoid" 
                        variants={itemVariants}
                    >
                        <img 
                            src={image.url} 
                            alt={image.caption} 
                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.caption}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default GalleryPage;
import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { User } from '../types';
import { motion } from 'framer-motion';

const LeaderboardPage: React.FC = () => {
    const { users } = useData();

    const sortedUsers = useMemo(() => {
        return users
            .filter(u => u.id !== 'guest' && u.email !== 'admin@potato.com')
            .sort((a, b) => b.spudPoints - a.spudPoints);
    }, [users]);

    const getRankColor = (rank: number) => {
        if (rank === 0) return 'bg-yellow-400 text-yellow-800';
        if (rank === 1) return 'bg-gray-300 text-gray-700';
        if (rank === 2) return 'bg-yellow-600 text-yellow-100';
        return 'bg-orange-200 text-orange-800';
    };
    
    const getTrophy = (rank: number) => {
        if (rank === 0) return '🏆';
        if (rank === 1) return '🥈';
        if (rank === 2) return '🥉';
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-orange text-glow">Spud-tacular Leaderboard</h1>
                <p className="mt-2 text-lg text-gray-600">See who's the top potato in our loyalty program!</p>
            </motion.div>

            <div className="max-w-2xl mx-auto mt-10 bg-brand-light rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                    {sortedUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:scale-[1.02] hover:shadow-xl transition-all duration-200 cursor-default"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(index)}`}>
                                {index + 1}
                            </div>
                            <div className="ml-4 flex-grow">
                                <p className="font-semibold text-brand-dark text-lg flex items-center">
                                    {user.name}
                                    <span className="ml-2">{getTrophy(index)}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-extrabold text-xl text-brand-orange text-glow">{user.spudPoints}</p>
                                <p className="text-xs text-gray-500">Spud Points</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {sortedUsers.length === 0 && <p className="text-center text-gray-500 py-8">No users to display yet.</p>}
            </div>
        </div>
    );
};

export default LeaderboardPage;
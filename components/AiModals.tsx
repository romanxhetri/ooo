
import React from 'react';
import Modal from './Modal';
import { useAppState } from '../context/AppContext';

const AiFeatureModal: React.FC = () => {
    const { activeAiModal, setActiveAiModal } = useAppState();

    const titles = {
        chef: 'Ask the Chef',
        assistant: 'AI Assistant',
        voice: 'Voice Ordering',
    };

    const title = activeAiModal ? titles[activeAiModal] : '';

    return (
        <Modal isOpen={!!activeAiModal} onClose={() => setActiveAiModal(null)} title={title}>
            <div className="text-center p-8">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">Feature Coming Soon!</h3>
                <p className="text-gray-600">
                    Our team of top potatoes is hard at work developing this amazing feature.
                    Check back soon to interact with our state-of-the-art AI!
                </p>
            </div>
        </Modal>
    );
};

export default AiFeatureModal;
    
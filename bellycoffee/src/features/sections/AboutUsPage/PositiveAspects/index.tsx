import React from 'react';
import { Palette, MessageCircle, DollarSign } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center p-8  rounded-lg ">
            <div className="mb-6 text-gray-800">
                {icon}
            </div>
            <h3 className="text-2xl font-serif mb-4 text-gray-900">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <Palette size={64} strokeWidth={1.5} />,
            title: 'Creative Design',
            description: 'Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim'
        },
        {
            icon: <DollarSign size={64} strokeWidth={1.5} />,
            title: '100% Money Back Guarantee',
            description: 'Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim'
        },
        {
            icon: <MessageCircle size={64} strokeWidth={1.5} />,
            title: 'Online Support 24/7',
            description: 'Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim'
        }
    ];

    return (
        <div className=" border border-gray-200 bg-gray-50 py-16 -mt-20 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;

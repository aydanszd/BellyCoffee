import React, { useState } from 'react';
import { ChevronDown, Truck, Award, Leaf } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number>(0);

    const features = [
        {
            icon: <Truck className="w-8 h-8" />,
            title: "Fast Free Delivery",
            description: "Nam liber tempor cum soluta nobis eleifend option.",
            details: [
                "Congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam est usus legentis in iis qui facit eorum claritatem.",
                "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
            ]
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "More Than 30 Years In The Business",
            description: "Decades of experience delivering quality products.",
            details: [
                "With over three decades in the organic food industry, we've perfected our craft and built lasting relationships with farmers and customers alike.",
                "Our expertise ensures you receive only the finest organic products."
            ]
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "100% Organic Foods",
            description: "Pure, natural, and certified organic ingredients.",
            details: [
                "Every product is certified organic and sourced from sustainable farms that prioritize environmental health and ethical practices.",
                "We maintain strict quality control to ensure purity in every item."
            ]
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "100% Organic Foods",
            description: "Pure, natural, and certified organic ingredients.",
            details: [
                "Every product is certified organic and sourced from sustainable farms that prioritize environmental health and ethical practices.",
                "We maintain strict quality control to ensure purity in every item."
            ]
        }
    ];

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#FFF9E6] via-[#FFEFD9] to-[#FFF7EB]">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-serif text-gray-800">
                                Why You Choose Us?
                            </h1>
                            <p className="text-gray-400 italic text-lg">
                                Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.
                            </p>
                        </div>
                        <div className="space-y-4 mt-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className={`w-full flex items-center justify-between p-6 text-left ${expandedIndex === index ? 'bg-[#B3936D]' : 'bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`${expandedIndex === index ? 'text-white' : 'text-gray-400'}`}>
                                                {feature.icon}
                                            </div>
                                            <span className={`text-xl font-medium ${expandedIndex === index ? 'text-white' : 'text-black'}`}>
                                                {feature.title}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 text-white transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-96' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-6 pt-0 space-y-4 mt-5">
                                            <p className={`text-xl font-serif mb-4 ${expandedIndex === index ? 'text-black' : 'text-gray-700'}`}>
                                                {feature.description}
                                            </p>
                                            {feature.details.map((detail, idx) => (
                                                <p key={idx} className={`leading-relaxed ${expandedIndex === index ? 'text-black' : 'text-gray-600'}`}>
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative lg:h-[600px] h-[400px] flex items-center justify-center">
                        <img
                            src="https://juice9.com/images/product/Beauty_drink_250ml_can/beauty_drink_lemon_aloe_vera.webp"
                            alt="Belly Product"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WhyChooseUs;
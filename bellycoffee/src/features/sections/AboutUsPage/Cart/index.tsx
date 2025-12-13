import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';

interface CardProps {
    image: string;
    title: string;
    description: string;
}

const threeCardsTranslations = {
    en: {
        cards: [
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-1.jpg",
                title: "What Do We Do?",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            },
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-2.jpg",
                title: "Our Mission",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            },
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-3.jpg",
                title: "History Of Us",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            }
        ]
    },
    ru: {
        cards: [
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-1.jpg",
                title: "Чем мы занимаемся?",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            },
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-2.jpg",
                title: "Наша миссия",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            },
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-3.jpg",
                title: "Наша история",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            }
        ]
    },
    az: {
        cards: [
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-1.jpg",
                title: "Biz nə edirik?",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            },
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-2.jpg",
                title: "Missiyamız",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            },
            {
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner2-3.jpg",
                title: "Tariximiz",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto"
            }
        ]
    }
};

const Card: React.FC<CardProps> = ({ image, title, description }) => {
    return (
        <div className="flex flex-col overflow-hidden">
            <div className="h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6 text-left"> 
                <h3 className="text-2xl font-[Rubik] font-bold text-gray-900 mb-4">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default function ThreeCards() {
    const currentLang = useSelector(selectCurrentLanguage);
    const t = threeCardsTranslations[currentLang];
    const cardsData = t.cards;

    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cardsData.map((card, index) => (
                        <Card
                            key={index}
                            image={card.image}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
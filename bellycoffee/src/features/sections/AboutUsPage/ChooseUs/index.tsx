import React, { useState } from 'react';
import { ChevronDown, Truck, Award, Leaf } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';
const whyChooseUsTranslations = {
    en: {
        title: "Why You Choose Us?",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        features: [
            {
                icon: "truck",
                title: "Fast Free Delivery",
                description: "Nam liber tempor cum soluta nobis eleifend option.",
                details: [
                    "Congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam est usus legentis in iis qui facit eorum claritatem.",
                    "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
                ]
            },
            {
                icon: "award",
                title: "More Than 30 Years In The Business",
                description: "Decades of experience delivering quality products.",
                details: [
                    "With over three decades in the organic food industry, we've perfected our craft and built lasting relationships with farmers and customers alike.",
                    "Our expertise ensures you receive only the finest organic products."
                ]
            },
            {
                icon: "leaf",
                title: "100% Organic Foods",
                description: "Pure, natural, and certified organic ingredients.",
                details: [
                    "Every product is certified organic and sourced from sustainable farms that prioritize environmental health and ethical practices.",
                    "We maintain strict quality control to ensure purity in every item."
                ]
            },
            {
                icon: "leaf",
                title: "100% Organic Foods",
                description: "Pure, natural, and certified organic ingredients.",
                details: [
                    "Every product is certified organic and sourced from sustainable farms that prioritize environmental health and ethical practices.",
                    "We maintain strict quality control to ensure purity in every item."
                ]
            }
        ]
    },
    ru: {
        title: "Почему выбирают нас?",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        features: [
            {
                icon: "truck",
                title: "Быстрая бесплатная доставка",
                description: "Nam liber tempor cum soluta nobis eleifend option.",
                details: [
                    "Congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam est usus legentis in iis qui facit eorum claritatem.",
                    "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
                ]
            },
            {
                icon: "award",
                title: "Более 30 лет в бизнесе",
                description: "Десятилетия опыта в поставке качественных продуктов.",
                details: [
                    "За более чем три десятилетия в индустрии органических продуктов мы усовершенствовали свое мастерство и построили долгосрочные отношения с фермерами и клиентами.",
                    "Наш опыт гарантирует, что вы получите только лучшие органические продукты."
                ]
            },
            {
                icon: "leaf",
                title: "100% органические продукты",
                description: "Чистые, натуральные и сертифицированные органические ингредиенты.",
                details: [
                    "Каждый продукт имеет органический сертификат и поставляется с устойчивых ферм, которые ставят во главу угла здоровье окружающей среды и этические практики.",
                    "Мы поддерживаем строгий контроль качества для обеспечения чистоты каждого товара."
                ]
            },
            {
                icon: "leaf",
                title: "100% органические продукты",
                description: "Чистые, натуральные и сертифицированные органические ингредиенты.",
                details: [
                    "Каждый продукт имеет органический сертификат и поставляется с устойчивых ферм, которые ставят во главу угла здоровье окружающей среды и этические практики.",
                    "Мы поддерживаем строгий контроль качества для обеспечения чистоты каждого товара."
                ]
            }
        ]
    },
    az: {
        title: "Nə üçün bizi seçirsiniz?",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        features: [
            {
                icon: "truck",
                title: "Sürətli pulsuz çatdırılma",
                description: "Nam liber tempor cum soluta nobis eleifend option.",
                details: [
                    "Congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam est usus legentis in iis qui facit eorum claritatem.",
                    "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum."
                ]
            },
            {
                icon: "award",
                title: "30 ildən çox təcrübə",
                description: "Keyfiyyətli məhsul çatdırılmasında onilliklər təcrübəsi.",
                details: [
                    "Üzvi qida sənayesində otuz ildən çox təcrübə ilə biz öz sənətimizi mükəmməlləşdirdik və fermerlər və müştərilərlə davamlı münasibətlər qurduq.",
                    "Təcrübəmiz sizə yalnız ən yaxşı üzvi məhsullar almağınızı təmin edir."
                ]
            },
            {
                icon: "leaf",
                title: "100% üzvi qidalar",
                description: "Təmiz, təbii və sertifikatlaşdırılmış üzvi inqrediyentlər.",
                details: [
                    "Hər məhsul üzvi sertifikata malikdir və ətraf mühitin sağlamlığına və etik təcrübələrə üstünlük verən davamlı təsərrüfatlardan təmin edilir.",
                    "Hər məhsulda təmizliyi təmin etmək üçün ciddi keyfiyyət nəzarətini saxlayırıq."
                ]
            },
            {
                icon: "leaf",
                title: "100% üzvi qidalar",
                description: "Təmiz, təbii və sertifikatlaşdırılmış üzvi inqrediyentlər.",
                details: [
                    "Hər məhsul üzvi sertifikata malikdir və ətraf mühitin sağlamlığına və etik təcrübələrə üstünlük verən davamlı təsərrüfatlardan təmin edilir.",
                    "Hər məhsulda təmizliyi təmin etmək üçün ciddi keyfiyyət nəzarətini saxlayırıq."
                ]
            }
        ]
    }
};

const WhyChooseUs: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number>(0);
    const currentLang = useSelector(selectCurrentLanguage);
    
    const t = whyChooseUsTranslations[currentLang];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'truck':
                return <Truck className="w-8 h-8" />;
            case 'award':
                return <Award className="w-8 h-8" />;
            case 'leaf':
                return <Leaf className="w-8 h-8" />;
            default:
                return <Leaf className="w-8 h-8" />;
        }
    };

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-linear-to-r from-[#FFF9E6] via-[#FFEFD9] to-[#FFF7EB]">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-serif text-gray-800">
                                {t.title}
                            </h1>
                            <p className="text-gray-400 italic text-lg">
                                {t.subtitle}
                            </p>
                        </div>
                        <div className="space-y-4 mt-8">
                            {t.features.map((feature, index) => (
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
                                                {getIcon(feature.icon)}
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
                    <div className="relative lg:h-150 h-100 flex items-center justify-center">
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
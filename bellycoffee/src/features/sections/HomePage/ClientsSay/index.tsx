import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';

const testimonialTranslations = {
    en: {
        title: "What Clients Say",
        testimonials: [
            {
                id: 1,
                text: "These guys have been absolutely outstanding. Perfect  I highly recommend this theme and these people!",
                name: "JOHN SULLIVAN",
                role: "Customer",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial3-150x150-100x100.jpg"
            },
            {
                id: 2,
                text: "Outstanding service and product quality! The attention to detail and customer support exceeded all my expectations. Highly professional team!",
                name: "SARAH JOHNSON",
                role: "Business Owner",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial1-150x150-100x100.jpg"
            },
            {
                id: 3,
                text: "Amazing experience from start to finish. The product is exceptional and the team behind it is incredibly supportive. Would definitely recommend!",
                name: "MICHAEL CHEN",
                role: "Developer",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial2-150x150-100x100.jpg"
            }
        ]
    },
    ru: {
        title: "Отзывы клиентов",
        testimonials: [
            {
                id: 1,
                text: "Эти ребята были абсолютно выдающимися. Идеально! Я очень рекомендую эту тему и этих людей!",
                name: "ДЖОН САЛЛИВАН",
                role: "Клиент",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial3-150x150-100x100.jpg"
            },
            {
                id: 2,
                text: "Выдающийся сервис и качество продукта! Внимание к деталям и поддержка клиентов превзошли все мои ожидания. Очень профессиональная команда!",
                name: "САРА ДЖОНСОН",
                role: "Владелец бизнеса",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial1-150x150-100x100.jpg"
            },
            {
                id: 3,
                text: "Удивительный опыт от начала до конца. Продукт исключительный, а команда невероятно поддерживающая. Определенно рекомендую!",
                name: "МАЙКЛ ЧЕН",
                role: "Разработчик",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial2-150x150-100x100.jpg"
            }
        ]
    },
    az: {
        title: "Müştəri Rəyləri",
        testimonials: [
            {
                id: 1,
                text: "Bu adamlar tamamilə əla olublar. Mükəmməl! Mən bu temanı və bu insanları çox tövsiyə edirəm!",
                name: "CON SULLIVAN",
                role: "Müştəri",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial3-150x150-100x100.jpg"
            },
            {
                id: 2,
                text: "Əla xidmət və məhsul keyfiyyəti! Detallara diqqət və müştəri dəstəyi bütün gözləntilərimdən üstün oldu. Çox peşəkar komanda!",
                name: "SARA CONSON",
                role: "Biznes Sahibi",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial1-150x150-100x100.jpg"
            },
            {
                id: 3,
                text: "Başdan sona heyrətamiz təcrübə. Məhsul müstəsnadır və arxasındakı komanda inanılmaz dəstəkləyicidir. Mütləq tövsiyə edərəm!",
                name: "MAYKL ÇEN",
                role: "Developer",
                image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial2-150x150-100x100.jpg"
            }
        ]
    }
};

const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const currentLang = useSelector(selectCurrentLanguage);
    
    const t = testimonialTranslations[currentLang];
    const testimonials = t.testimonials;

    return (
        <div className="bg-gray-900 text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="relative z-10">
                            <img
                                src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial-img.jpg"
                                alt="Chef with Belly coffee"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-5xl font-serif mb-4">{t.title}</h2>
                        <div className="flex items-center gap-2 mb-8">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-[#B3936D] rotate-45"></div>
                            ))}
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-10">
                            <span className="text-7xl text-gray-700 leading-none">"</span>
                            {testimonials[activeIndex].text}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <img
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="font-semibold text-[#B3936D]">{testimonials[activeIndex].name}</h4>
                                <p className="text-gray-400 text-sm">{testimonials[activeIndex].role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 ml-15">
                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-[#B3936D]' : 'bg-gray-600'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;
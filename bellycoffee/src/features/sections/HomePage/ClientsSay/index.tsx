import  { useState } from 'react';

const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
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
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

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
                        <h2 className="text-5xl font-serif mb-4">What Clients Say</h2>
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
                        <div className="flex items-center gap-4 ml-[60px]">
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
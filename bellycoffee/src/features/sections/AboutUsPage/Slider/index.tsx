import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: "JOHN SULLIVAN",
            role: "Customer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            text: "These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!"
        },
        {
            id: 2,
            name: "SARAH ANDERSON",
            role: "Business Owner",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            text: "Incredible service and attention to detail! The team went above and beyond to ensure everything was perfect. I couldn't be happier with the results and would recommend them to anyone looking for quality work."
        },
        {
            id: 3,
            name: "MICHAEL CHEN",
            role: "Developer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            text: "Outstanding quality and exceptional customer support. The product exceeded all my expectations and the team was always available to help. This is exactly what I was looking for!"
        }
    ];

    const handlePrevious = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        }
    };

    const handleNext = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }
    };

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    const currentTestimonial = testimonials[activeIndex];

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 -mt-130">
            <div className="max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <img
                                src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/testimonial-img.jpg"
                                alt="Chef with Belly coffee cup"
                                className="w-full max-w-6xl h-auto  shadow-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-[#B3936D] flex justify-center">
                            <img className='h-2'
                                src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/line.png"
                                alt=""
                            />
                        </div>

                        <div className="text-gray-800 text-[120px] leading-none font-serif mt-2">
                            "
                        </div>

                        <div
                            key={currentTestimonial.id}
                            className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                                }`}
                        >
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 -mt-7.5">
                                {currentTestimonial.text}
                            </p>

                            <div className="flex items-center space-x-4">
                                <img
                                    src={currentTestimonial.image}
                                    alt={currentTestimonial.name}
                                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                <div>
                                    <h4 className="text-gray-800 font-semibold text-sm tracking-wider">
                                        {currentTestimonial.name}
                                    </h4>
                                    <p className="text-gray-500 text-sm">{currentTestimonial.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handlePrevious}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-600" />
                            </button>

                            <div className="flex space-x-2 ">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!isAnimating) {
                                                setIsAnimating(true);
                                                setActiveIndex(index);
                                            }
                                        }}
                                        className={`h-4 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? 'w-4 bg-[#B3936B]'
                                            : 'w-4 bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
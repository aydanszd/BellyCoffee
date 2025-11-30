import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Original Coffee",
        subtitle: "Best Choice For Restaurant, Cafe and More...",
        description: "Discover the rich and bold flavors 1 of our signature blend coffee. Perfect for any occasion. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing ",
        image: "https://cafedarte.gr/wp-content/uploads/2017/09/coffee_slide-1-1.jpg"
    },
    {
        id: 2,
        title: "Premium Blend",
        subtitle: "Experience the Finest Coffee Beans",
        description: "Discover2 the rich and bold flavors 1 of our signature blend coffee. Perfect for any occasion. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing ",
        image: "https://acoffee-store-demo.myshopify.com/cdn/shop/files/banner-v1-2.jpg?v=1614317123"
    },
    {
        id: 3,
        title: "Artisan Roasted",
        subtitle: "Crafted with Passion and Expertise",
        description: "3Discover the rich and bold flavors 1 of our signature blend coffee. Perfect for any occasion. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing ",
        image: "https://krzepi.pl/wp-content/uploads/2022/04/12-oz-copy.webp"
    }
];

export default function CoffeeSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div
            className="relative w-full h-screen bg-cover bg-center transition-all duration-1000"
            style={{
                backgroundImage: `url(${slides[currentSlide].image})`
            }}
        >
            <div className="relative z-10 flex items-center h-full px-6 lg:px-16">
                <div className="max-w-2xl space-y-6 text-left ml-[60px]">
                    <p className="uppercase tracking-wider font-medium text-black text-2xl">
                        {slides[currentSlide].subtitle}
                    </p>

                    <h1 className="text-6xl lg:text-7xl font-serif font-light leading-tight text-black">
                        {slides[currentSlide].title}
                    </h1>

                    <p className="text-black text-lg leading-relaxed font-normal">
                        {slides[currentSlide].description}
                    </p>

                    <button className="mt-8 px-8 py-4 rounded-[6px] bg-[#B3936D] hover:bg-amber-700 text-white font-medium uppercase tracking-wider shadow-lg transition">
                        Discover Now
                    </button>
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-6  translate-y-[30px]  top-1/2  p-4 bg-white/80 rounded-full shadow hover:bg-white transition z-20"
            >
                <ChevronLeft className="text-gray-800" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute translate-y-[30px] right-6 top-1/2  p-4 bg-white/80 rounded-full shadow hover:bg-white transition z-20"
            >
                <ChevronRight className="text-gray-800" />
            </button>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                            ? "w-10 h-3 bg-amber-600"
                            : "w-3 h-3 bg-white/60"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}
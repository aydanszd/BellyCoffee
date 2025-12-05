import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Rss, Mail, Phone, MapPin, ShoppingCart, Heart, User, Package, Truck, RotateCcw, Bell, Clock, ChevronUp } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        if (email) {
            alert(`Subscribed with: ${email}`);
            setEmail('');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const instagramPhotos = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop',
    ];

    return (
        <footer className="bg-gray-950 text-gray-400">
            <div className="bg-gray-950 py-16 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                                Join Our Newsletter Now
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Get E-mail updates about our latest shop and special offers.
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email Address..."
                                className="px-6 py-4 bg-[#1a1d23] text-gray-300 rounded w-full md:w-96 focus:outline-none focus:ring-1 focus:ring-amber-600 placeholder-gray-600"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="px-8 py-4 bg-[#c9a063] hover:bg-[#b38f55] text-white font-medium rounded transition-colors duration-300 whitespace-nowrap uppercase text-sm tracking-wide"
                            >
                                Subcribe!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">Contact Us</h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#c9a063] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white text-lg font-medium">+ (012) 800 456 789</span>
                            </div>
                            <div className="text-sm">
                                <p className="mb-1"><span className="text-white">Address:</span> 123 Main Street, Anytown, CA 12345 – USA.</p>
                                <p><span className="text-white">Email:</span> Contact@domain.com</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-8">
                            {[Facebook, Twitter, Instagram, Linkedin, Rss].map((Icon, index) => (
                                <button
                                    key={index}
                                    className="w-10 h-10 bg-[#2a2d35] hover:bg-[#c9a063] rounded-full flex items-center justify-center transition-colors duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">Information</h3>
                        <ul className="space-y-3 text-sm">
                            {['About Us', 'Contact', 'Privacy Policy', 'Frequently Questions', 'Customer Service', 'Delivery Information'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">My Account</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                'My Account',
                                'Cart',
                                'Wishlist',
                                'Checkout',
                                'About Us',
                                'Contact',
                            ].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">Photo Instagram</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {instagramPhotos.map((photo, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="relative group overflow-hidden rounded aspect-square"
                                >
                                    <img
                                        src={photo}
                                        alt={`Instagram ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on all order' },
                            { icon: RotateCcw, title: 'Money Return', desc: 'Back guarantee under 7 days' },
                            { icon: Bell, title: 'Member Discount', desc: 'Onevery order over $120.00' },
                            { icon: Clock, title: 'Online Support', desc: 'Support online 24 hours a day' },
                        ].map((feature, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-16 h-16 border-2 border-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-7 h-7 text-gray-600" />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-white font-medium mb-1 text-lg">{feature.title}</h4>
                                    <p className="text-sm text-gray-500">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-gray-500 text-center md:text-left m-auto">
                            © Copyright 2025{' '}
                            <a href="#" className="text-[#c9a063] hover:underline font-medium">
                                Belly
                            </a>
                            {' '}- All Rights Reserved – Powered by WooVina Theme.
                        </p>

                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';

export default function BellyNavbar() {
    const [isPagesOpen, setIsPagesOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="shrink-0">
                        <a href="/" className="flex items-center">
                            <div>
                                <img
                                    src="https://demo-22.woovinapro.com/wp-content/uploads/2019/09/logo-1.png"
                                    alt="Logo"
                                    className="h-10 w-auto object-contain"
                                />

                            </div>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-[13px] ml-[480px]">
                        <a
                            href="/"
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            HOME
                        </a>

                        <div className="relative">
                            <a
                                href="/shop"
                                className="text-black hover:text-[#B3936D] transition-colors font-medium inline-flex items-center"
                            >
                                SHOP
                            </a>
                        </div>

                        <div className="relative">
                            <a
                                href="/blog"
                                className="text-black hhover:text-[#B3936D] transition-colors font-medium inline-flex items-center"
                            >
                                BLOG
                            </a>
                        </div>

                        <div
                            className="relative"
                            onMouseEnter={() => setIsPagesOpen(true)}
                            onMouseLeave={() => setIsPagesOpen(false)}
                        >
                            <button
                                className="text-black hover:text-[#B3936D] transition-colors font-medium inline-flex items-center"
                            >
                                PAGES
                                <ChevronDown className="ml-1 w-4 h-4" />
                            </button>

                            {isPagesOpen && (
                                <div className="absolute text-black top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                                    <a href="/pages/about" className="block px-4 py-2 text-black hover:bg-gray-100">
                                        About
                                    </a>
                                    <a href="/pages/services" className="block px-4 py-2 text-black hover:bg-gray-100">
                                        Services
                                    </a>
                                    <a href="/pages/gallery" className="block px-4 py-2 text-black hover:bg-gray-100">
                                        Gallery
                                    </a>
                                </div>
                            )}
                        </div>

                        <a
                            href="/about"
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            ABOUT US
                        </a>

                        <a
                            href="/contact"
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            CONTACT US
                        </a>
                    </div>

                    <div className="flex items-center space-x-7">
                        <button className="text-black hover:text-gray-500 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <button className="text-black hover:text-gray-500 transition-colors relative">
                            <ShoppingCart className="w-5 h-5" />
                        </button>

                        <button className="text-black hover:text-[#B3936D] transition-colors md:hidden">
                            <Menu className="w-5 h-5" />
                        </button>

                        <button className="hidden text-black md:block p-2 hover:bg-gray-100 rounded transition-colors">
                            <div className="grid grid-cols-3 gap-1">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                                ))}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
                <a
                    href="#"
                    className="bg-orange-500 text-center text-white w-20 h-20 shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-sm font-bold"
                >
                    MORE DEMOS
                </a>
            </div>

        </nav>
    );
}
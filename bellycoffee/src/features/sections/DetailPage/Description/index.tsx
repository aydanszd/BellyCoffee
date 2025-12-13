import { useState } from 'react';

const ProductPage = () => {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'reviews', label: 'Reviews (0)' },
        { id: 'brands', label: 'About Brands' },
        { id: 'shipping', label: 'Shipping & Delivery' }
    ];

    return (
        <div className="border-t border-gray-200 -mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="border-b border-gray-200 mb-8">
                    <div className="flex justify-center space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 px-1 font-serif text-[20px] transition-colors relative ${activeTab === tab.id
                                        ? 'text-[#B3936D] border-b-2 border-[#B3936D]'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-12">
                    {activeTab === 'description' && (
                        <div className="text-gray-600 space-y-4">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor.
                            </p>
                            <p>
                                Ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi.
                            </p>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="text-gray-600">
                            <p className="mb-6">There are no reviews yet.</p>

                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Be the first to review "Aliquam furniture"</h3>
                                <p className="text-sm mb-4">
                                    Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
                                </p>

                                <div className="mb-6">
                                    <label className="block mb-2">
                                        Your rating <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} className="text-2xl text-gray-300 hover:text-yellow-400">
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2">
                                        Your review <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="flex items-start">
                                        <input type="checkbox" className="mt-1 mr-2" />
                                        <span className="text-sm">Save my name, email, and website in this browser for the next time I comment.</span>
                                    </label>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2">Please enter an answer in digits:</label>
                                    <p className="mb-2">19 − four =</p>
                                    <input
                                        type="text"
                                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                <button className="px-8 py-3 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'brands' && (
                        <div className="text-gray-600">
                            <p>Information about the brands will be displayed here.</p>
                        </div>
                    )}
                    {activeTab === 'shipping' && (
                        <div className="text-gray-600">
                            <p>Shipping and delivery information will be displayed here.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductPage;
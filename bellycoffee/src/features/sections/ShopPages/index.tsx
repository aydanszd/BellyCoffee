import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Grid, List, ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ShopPage = () => {
    const [viewType, setViewType] = useState('grid');
    const [priceRange, setPriceRange] = useState([10, 170]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const categories = [
        'Cafe Latte',
        'Cappuccino',
        'Flat White',
        'Long Macchiato',
        'Mocha',
        'Piccolo Latte',
        'Short Macchiato',
        'Uncategorized'
    ];

    const allProducts = [
        {
            id: 1,
            name: 'Aliquam furniture',
            price: 60.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-07.jpg',
            countdown: true,
            rating: 4.5
        },
        {
            id: 2,
            name: 'Aliquam lobortis',
            price: 75.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-01.jpg',
            countdown: false,
            rating: 5
        },
        {
            id: 3,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-04-300x300.jpg',
            countdown: false,
            rating: 4
        },
        {
            id: 4,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-5-300x300.jpg',
            countdown: false,
            rating: 4
        },
        {
            id: 5,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-06-300x300.jpg',
            countdown: false,
            rating: 4
        },
        {
            id: 6,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-9.jpg',
            countdown: false,
            rating: 5
        },
        {
            id: 7,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-15.jpg',
            countdown: false,
            rating: 2
        },
        {
            id: 9,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-12.jpg',
            countdown: false,
            rating: 3
        },
        {
            id: 10,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-10.jpg',
            countdown: false,
            rating: 3
        },
        {
            id: 11,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-02.jpg',
            countdown: false,
            rating: 3
        },
        {
            id: 12,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-08-300x300.jpg',
            countdown: false,
            rating: 3
        },
        {
            id: 13,
            name: 'Aliquam sit amet',
            price: 62.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-11-300x300.jpg',
            countdown: false,
            rating: 3
        },
        {
            id: 14,
            name: 'Coffee Machine',
            price: 120.00,
            image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-07.jpg',
            countdown: false,
            rating: 4
        }
    ];

    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen mt-[110px]">
            <div className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-serif mb-4">Shop</h1>
                    <p className="text-gray-600">Home /<span className='text-[#B3936B]'>Shop</span> </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-12 gap-8">
                    <aside className="col-span-12 lg:col-span-3">
                        <div className=" p-6 mb-6">
                            <h3 className="text-xl mb-4 pb-2 border-b-2 inline-block font-[Rubik]">Product categories</h3>
                            <ul className="space-y-3 mt-6">
                                {categories.map((category, idx) => (
                                    <li key={idx}>
                                        <a href="#" className="text-black hover:text-[#B3936B] flex items-center justify-between group">
                                            <span>{category}</span>
                                            {category === 'Cappuccino' && <ChevronDown className="w-4 h-4" />}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">Filter by price</h3>
                            <div className="mt-6">
                                <input
                                    type="range"
                                    min="10"
                                    max="170"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full accent-[#B3936D]"
                                />
                                <button className="mt-4 px-6 py-2 font-semibold border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                    FILTER
                                </button>
                                <p className="text-sm text-gray-600 mt-4">Price: ${priceRange[0]} — ${priceRange[1]}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <h3 className="text-xl mb-4 pb-2 border-b-2 font-[Rubik] border-black inline-block">Filter by</h3>
                            <ul className="space-y-3 mt-6">
                                <li className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="mr-3 w-4 h-4 accent-orange-500" />
                                        <span className="text-gray-700">Black</span>
                                    </label>
                                    <span className="text-gray-500 text-sm">2</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="mr-3 w-4 h-4 accent-orange-500" />
                                        <span className="text-gray-700">Blue</span>
                                    </label>
                                    <span className="text-gray-500 text-sm">1</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="mr-3 w-4 h-4 accent-orange-500" />
                                        <span className="text-gray-700">Red</span>
                                    </label>
                                    <span className="text-gray-500 text-sm">1</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="mr-3 w-4 h-4 accent-orange-500" />
                                        <span className="text-gray-700">White</span>
                                    </label>
                                    <span className="text-gray-500 text-sm">1</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">Product tags</h3>
                            <div className="flex flex-wrap gap-2 mt-6">
                                {['TAG-01', 'TAG-02', 'TAG-03', 'TAG-04', 'TAG-05', 'TAG-06', 'TAG-08'].map((tag) => (
                                    <button
                                        key={tag}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-[#B3936D] hover:text-white transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                            <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">Compare</h3>
                            <div className="mt-6">
                                <p className="text-gray-600 text-sm mb-4">No products to compare</p>
                                <div className="flex gap-2">
                                    <button className="text-orange-500 text-sm hover:underline">Clear all</button>
                                    <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm flex-1">
                                        COMPARE
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm mt-[-50px]">
                            <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">Top rated products</h3>
                            <div className="space-y-4 mt-6">
                                <div className="flex gap-4 pb-4 border-b">
                                    <img src="https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-07.jpg" alt="Product" className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium mb-1">Convallis quam sit</h4>
                                        <div className="flex items-center gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-[#B3936D] font-semibold">$13.00</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <img src="https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-01.jpg" alt="Product" className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium mb-1">Aliquet auctor sem</h4>
                                        <div className="flex items-center gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-[#B3936D] font-semibold">$165.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="col-span-12 lg:col-span-9">
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`p-2 ${viewType === 'grid' ? 'bg-gray-200' : ''}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`p-2 ${viewType === 'list' ? 'bg-gray-200' : ''}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                                <span className="text-sm text-gray-600">VIEW: 12 / 24 / ALL</span>
                            </div>

                            <select className="border border-gray-300 rounded px-4 py-2 text-sm">
                                <option>Default sorting</option>
                                <option>Sort by price: low to high</option>
                                <option>Sort by price: high to low</option>
                                <option>Sort by latest</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {currentProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-64 object-cover"
                                        />
                                        {product.countdown && (
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                {[
                                                    { value: '00', label: 'Days' },
                                                    { value: '00', label: 'Hours' },
                                                    { value: '00', label: 'Minutes' },
                                                    { value: '00', label: 'Seconds' }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="bg-white bg-opacity-90 px-3 py-2 rounded text-center">
                                                        <div className="text-xl font-bold">{item.value}</div>
                                                        <div className="text-xs text-gray-600">{item.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>

                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= Math.floor(product.rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : star - 0.5 === product.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'fill-gray-200 text-gray-200'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                                        </div>

                                        <p className="text-xl text-[#B3936B] font-semibold mb-4">${product.price.toFixed(2)}</p>
                                        <button className="w-full px-6 py-2 border border-gray-300 rounded hover:bg-[#B3936D] hover:text-white hover:border-[#B3936D] transition-colors">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center p-7 items-center mt-8 gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 border rounded ${currentPage === 1 
                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'border-gray-300 hover:border-[#B3936D] hover:text-[#B3936D]'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`min-w-[40px] h-[40px] border rounded ${currentPage === pageNum
                                            ? 'bg-[#B3936D] text-white border-[#B3936D]'
                                            : 'border-[#B3936D] hover:border-[#B3936D] hover:text-[#B3936D]'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 border rounded ${currentPage === totalPages
                                    ? 'border-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'border-gray-300 hover:border-[#B3936D] hover:text-[#B3936D]'
                                }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
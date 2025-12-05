import React, { useState } from 'react';
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    badge?: 'Hot' | 'New';
    rating: number;
    reviews: number;
}

const NewArrivals: React.FC = () => {
    const [cart, setCart] = useState<number[]>([]);

    const products: Product[] = [
        {
            id: 1,
            name: "Aliquet auctor sem",
            price: 165.00,
            rating: 4.5,
            reviews: 128,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-07-300x300.jpg",
        },
        {
            id: 2,
            name: "Aliquam sit amet",
            price: 62.00,
            rating: 5.0,
            reviews: 89,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-03-300x300.jpg",
        },
        {
            id: 3,
            name: "Aliquam lobortis",
            price: 75.00,
            rating: 4.0,
            reviews: 56,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-01-300x300.jpg",
        },
        {
            id: 4,
            name: "Duis bibendum",
            price: 75.00,
            rating: 4.8,
            reviews: 203,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-14-300x300.jpg",
            badge: 'Hot'
        },
        {
            id: 5,
            name: "Vanilla cream coffee",
            price: 48.00,
            rating: 4.2,
            reviews: 67,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-08-300x300.jpg",
        },
        {
            id: 6,
            name: "Premium dark roast",
            price: 89.00,
            rating: 4.9,
            reviews: 145,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-9-300x300.jpg",
            badge: 'New'
        },
        {
            id: 7,
            name: "House blend coffee",
            price: 54.00,
            rating: 4.3,
            reviews: 92,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-06-300x300.jpg",
        },
        {
            id: 8,
            name: "Coffee maker deluxe",
            price: 125.00,
            rating: 4.7,
            reviews: 178,
            image: "https://demo-22.woovinapro.com/wp-content/uploads/2019/10/product-16-300x300.jpg",
        }
    ];

    const addToCart = (productId: number) => {
        setCart([...cart, productId]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-5xl font-serif text-gray-900 mb-4">New Arrivals</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Mirum est notare quam littera gothica, quem nunc putamus parum claram anteposuerit litterarum.
                </p>
                <div className="mt-8 flex justify-center">
                    <img src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/heading-title-icon.png" alt="" />
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                        >
                            <div className="relative overflow-hidden">
                                {product.badge && (
                                    <span className={`absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold text-white rounded ${product.badge === 'Hot' ? 'bg-red-500' : 'bg-green-500'
                                        }`}>
                                        {product.badge}
                                    </span>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className=" bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-gray-800 font-medium mb-2 text-lg">
                                    {product.name}
                                </h3>

                                <div className="flex items-center justify-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => {
                                        const isFilled = star <= product.rating;
                                        return (
                                            <svg
                                                key={star}
                                                className={`w-4 h-4 ${isFilled ? 'text-amber-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        );
                                    })}
                                    <span className="text-gray-500 text-sm ml-1">
                                        ({product.reviews})
                                    </span>
                                </div>

                                <p className="text-amber-700 text-xl font-semibold mb-4">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="w-full border-2 border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300 font-medium uppercase text-sm tracking-wide"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
};

export default NewArrivals;
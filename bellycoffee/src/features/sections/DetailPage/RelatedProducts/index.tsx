const products = [
    {
        id: 1,
        name: 'Commodo dolor',
        price: 82.00,
        image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-06.jpg'
    },
    {
        id: 2,
        name: 'Condimentum furniture',
        price: 52.00,
        image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-9.jpg'
    },
    {
        id: 3,
        name: 'Curabitur a purus',
        price: 95.00,
        image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-02.jpg'
    },
    {
        id: 4,
        name: 'Duis bibendum',
        price: 75.00,
        image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-14.jpg'
    }
];

const StarRating = () => (
    <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

export default function RelatedProducts() {
    return (
        <div className=" py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-black mb-2">Related products</h2>
                    <div className="w-16 h-0.5 bg-[#B3936D] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="aspect-square bg-gray-100 p-8 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-lg font-medium text-gray-800 mb-3">{product.name}</h3>
                                <StarRating />
                                <p className="text-2xl font-medium text-amber-700 mb-6">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button className="w-full border-2 border-gray-800 text-gray-800 py-3 px-6 font-medium hover:bg-gray-800 hover:text-white transition-colors duration-300">
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
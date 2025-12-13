import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectIsLoggedIn } from '../../../../Redux/Slices/cartSlice';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';

interface Product {
    id: number;
    documentId: string;
    name: string;
    price: number;
    oldprice?: number | null;
    image: string;
    OutOfStock: boolean;
    rating: number;
}

const featuredTranslations = {
    en: {
        title: "Featured Products",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        outOfStock: "OUT OF STOCK",
        readMore: "READ MORE",
        addToCart: "ADD TO CART",
        loginToBuy: "LOGIN TO BUY",
        loading: "Loading featured products...",
        pleaseLogin: "Please login to add items to cart",
        loginToAddToCart: "Login to add to cart",
        addedToCart: "added to cart!"
    },
    ru: {
        title: "Избранные товары",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        outOfStock: "НЕТ В НАЛИЧИИ",
        readMore: "ПОДРОБНЕЕ",
        addToCart: "В КОРЗИНУ",
        loginToBuy: "ВОЙТИ ДЛЯ ПОКУПКИ",
        loading: "Загрузка избранных товаров...",
        pleaseLogin: "Пожалуйста, войдите, чтобы добавить товары в корзину",
        loginToAddToCart: "Войдите, чтобы добавить в корзину",
        addedToCart: "добавлен в корзину!"
    },
    az: {
        title: "Seçilmiş məhsullar",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        outOfStock: "STOKDA YOX",
        readMore: "ƏTRAFLI OXU",
        addToCart: "SƏBƏTƏ ƏLAVƏ ET",
        loginToBuy: "ALMAQ ÜÇÜN GİRİŞ ET",
        loading: "Seçilmiş məhsullar yüklənir...",
        pleaseLogin: "Səbətə əlavə etmək üçün giriş edin",
        loginToAddToCart: "Səbətə əlavə etmək üçün giriş",
        addedToCart: "səbətə əlavə edildi!"
    }
};

const FeaturedProducts: React.FC = () => {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const currentLang = useSelector(selectCurrentLanguage);
    
    const t = featuredTranslations[currentLang];

    const handleAddToCart = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isLoggedIn) {
            alert(t.pleaseLogin);
            navigate('/login');
            return;
        }
        
        dispatch(addToCart({
            id: product.documentId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        }));
        console.log(`${product.name} ${t.addedToCart}`);
    };

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/products?populate=*');
                const data = await response.json();
                
                const featuredProducts = data.data
                    .filter((item: any) => item.FeaturedProducts === true)
                    .map((item: any) => ({
                        id: item.id,
                        documentId: item.documentId,
                        name: item.name || 'Unknown Product',
                        price: item.price ? parseFloat(item.price) : 0,
                        oldprice: item.oldprice ? parseFloat(item.oldprice) : null,
                        image: item.image?.url ? `http://localhost:1337${item.image.url}` : '',
                        OutOfStock: item.OutOfStock === true,
                        rating: 0
                    }));
                
                setProducts(featuredProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured products:', error);
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const renderStars = (product: Product) => {
        return (
            <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className="w-3 h-3 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="py-20 px-4 -mt-20">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-500">{t.loading}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 px-4 -mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2
                        className="text-4xl font-light text-gray-900 mb-3"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        {t.title}
                    </h2>
                    <p className="text-gray-400 text-sm italic max-w-2xl mx-auto mb-6">
                        {t.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-24 bg-gray-300"></div>
                        <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                        </svg>
                        <div className="h-px w-24 bg-gray-300"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.documentId}
                            className="group relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            onClick={() => navigate(`/product/${product.documentId}`)}
                        >
                            {product.OutOfStock && (
                                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-2 py-1 text-xs font-semibold flex items-center gap-1.5">
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                    </svg>
                                    {t.outOfStock}
                                </div>
                            )}

                            <div className="relative h-72 bg-white flex items-center justify-center overflow-hidden p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                                <div
                                    className={`absolute inset-0 bg-white transition-opacity duration-300 flex items-center justify-center gap-2 ${
                                        hoveredProduct === product.id
                                            ? 'bg-opacity-90 opacity-100'
                                            : 'opacity-0'
                                    }`}
                                >
                                    <button 
                                        className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200 shadow-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>

                                    {!product.OutOfStock && (
                                        <button 
                                            className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200 shadow-sm"
                                            onClick={(e) => handleAddToCart(product, e)}
                                            title={!isLoggedIn ? t.loginToAddToCart : t.addToCart}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-5 text-center bg-white border-t border-gray-100">
                                <h3 className="text-sm font-normal text-gray-700 mb-2">
                                    {product.name}
                                </h3>
                                {renderStars(product)}

                                <div className="flex items-center justify-center gap-2 mb-4">
                                    {product.oldprice && (
                                        <span className="text-gray-400 line-through text-sm">
                                            ${product.oldprice.toFixed(2)}
                                        </span>
                                    )}
                                    <span className="text-base font-medium text-orange-500">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 border ${
                                        product.OutOfStock
                                            ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900'
                                    }`}
                                    disabled={product.OutOfStock}
                                    onClick={(e) => product.OutOfStock ? e.stopPropagation() : handleAddToCart(product, e)}
                                    title={!isLoggedIn && !product.OutOfStock ? t.loginToAddToCart : ''}
                                >
                                    {product.OutOfStock ? t.readMore : (isLoggedIn ? t.addToCart : t.loginToBuy)}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
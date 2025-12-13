import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, X, LogOut, Globe } from 'lucide-react';
import { selectCartItemsCount, setLoginStatus } from '../../Redux/Slices/cartSlice';
import { selectCurrentLanguage, setLanguage, type Language } from '../../Redux/Slices/languageSlice';

interface Product {
    id: number;
    documentId: string;
    name: string;
    price: string;
    image: {
        url: string;
    };
}
const translations = {
    en: {
        home: 'HOME',
        shop: 'SHOP',
        blog: 'BLOG',
        aboutUs: 'ABOUT US',
        contactUs: 'CONTACT US',
        logout: 'Logout',
        myAccount: 'My Account',
        wishlist: 'Wishlist',
        checkout: 'Checkout',
        searchPlaceholder: 'Search products by name...',
        searching: 'Searching...',
        noProducts: 'No products found for',
        moreDemos: 'MORE DEMOS'
    },
    ru: {
        home: 'ГЛАВНАЯ',
        shop: 'МАГАЗИН',
        blog: 'БЛОГ',
        aboutUs: 'О НАС',
        contactUs: 'КОНТАКТЫ',
        logout: 'Выйти',
        myAccount: 'Мой аккаунт',
        wishlist: 'Избранное',
        checkout: 'Оформить',
        searchPlaceholder: 'Поиск товаров по названию...',
        searching: 'Поиск...',
        noProducts: 'Товары не найдены для',
        moreDemos: 'БОЛЬШЕ ДЕМО'
    },
    az: {
        home: 'ANA SƏHİFƏ',
        shop: 'MAĞAZA',
        blog: 'BLOQ',
        aboutUs: 'HAQQIMIZDA',
        contactUs: 'ƏLAQƏ',
        logout: 'Çıxış',
        myAccount: 'Hesabım',
        wishlist: 'İstək siyahısı',
        checkout: 'Ödəniş',
        searchPlaceholder: 'Məhsulları ada görə axtar...',
        searching: 'Axtarılır...',
        noProducts: 'Məhsul tapılmadı',
        moreDemos: 'DAHA ÇOX DEMO'
    }
};

type Language = 'en' | 'ru' | 'az';

export default function BellyNavbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    
    const cartItemsCount = useSelector(selectCartItemsCount);
    const currentLang = useSelector(selectCurrentLanguage);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const t = translations[currentLang];

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        dispatch(setLoginStatus(false));
        navigate('/');
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        
        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        
        try {
            const response = await fetch(`http://localhost:1337/api/products?populate=*&filters[name][$containsi]=${query}`);
            const data = await response.json();
            setSearchResults(data.data || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleProductClick = (documentId: string) => {
        navigate(`/product/${documentId}`);
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const changeLang = (lang: Language) => {
        dispatch(setLanguage(lang));
        setIsLangMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="shrink-0">
                        <button onClick={() => navigate('/')} className="flex items-center">
                            <img
                                src="https://demo-22.woovinapro.com/wp-content/uploads/2019/09/logo-1.png"
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-8 text-[13px] ml-120">
                        <button
                            onClick={() => navigate('/')}
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            {t.home}
                        </button>

                        <button
                            onClick={() => navigate('/shop')}
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            {t.shop}
                        </button>

                        <button
                            onClick={() => navigate('/blog')}
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            {t.blog}
                        </button>

                        <button
                            onClick={() => navigate('/AboutUs')}
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            {t.aboutUs}
                        </button>

                        <button
                            onClick={() => navigate('/ContactUs')}
                            className="text-black hover:text-[#B3936D] transition-colors font-medium"
                        >
                            {t.contactUs}
                        </button>
                    </div>
                    <div className="flex items-center space-x-7">
                        <div className="relative">
                            <button 
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-1 text-black hover:text-[#B3936D] transition-colors"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="text-xs font-medium uppercase">{currentLang}</span>
                            </button>

                            {isLangMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-md py-2 z-50">
                                    <button 
                                        onClick={() => changeLang('en')}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLang === 'en' ? 'bg-gray-50 font-bold text-[#B3936D]' : ''}`}
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => changeLang('ru')}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLang === 'ru' ? 'bg-gray-50 font-bold text-[#B3936D]' : ''}`}
                                    >
                                        Русский
                                    </button>
                                    <button 
                                        onClick={() => changeLang('az')}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLang === 'az' ? 'bg-gray-50 font-bold text-[#B3936D]' : ''}`}
                                    >
                                        Azərbaycan
                                    </button>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-black hover:text-gray-500 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => navigate('/cart')}
                            className="text-black hover:text-gray-500 transition-colors relative"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#B3936D] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-black hover:text-[#B3936D] transition-colors md:hidden"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <div className="relative hidden md:block group">
                            <button className="text-black p-2 hover:bg-gray-100 rounded transition-colors">
                                <div className="grid grid-cols-3 gap-1">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-gray-600 rounded-sm group-hover:bg-[#B3936D] transition-colors"></div>
                                    ))}
                                </div>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <button 
                                    onClick={handleLogout} 
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t.logout}
                                </button>
                                <button 
                                    onClick={() => navigate('/login')} 
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {t.myAccount}
                                </button>
                                <button 
                                    onClick={() => navigate('/wishlist')} 
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {t.wishlist}
                                </button>
                                <button 
                                    onClick={() => navigate('/checkout')} 
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {t.checkout}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-3 space-y-3">
                        <button
                            onClick={() => {
                                navigate('/');
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-black hover:text-[#B3936D] transition-colors font-medium py-2"
                        >
                            {t.home}
                        </button>

                        <button
                            onClick={() => {
                                navigate('/shop');
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-black hover:text-[#B3936D] transition-colors font-medium py-2"
                        >
                            {t.shop}
                        </button>

                        <button
                            onClick={() => {
                                navigate('/blog');
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-black hover:text-[#B3936D] transition-colors font-medium py-2"
                        >
                            {t.blog}
                        </button>

                        <button
                            onClick={() => {
                                navigate('/AboutUs');
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-black hover:text-[#B3936D] transition-colors font-medium py-2"
                        >
                            {t.aboutUs}
                        </button>

                        <button
                            onClick={() => {
                                navigate('/ContactUs');
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-black hover:text-[#B3936D] transition-colors font-medium py-2"
                        >
                            {t.contactUs}
                        </button>

                        <div className="border-t pt-3 space-y-2">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left text-gray-600 hover:text-[#B3936D] py-1 items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                {t.logout}
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left text-gray-600 hover:text-[#B3936D] py-1"
                            >
                                {t.myAccount}
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/wishlist');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left text-gray-600 hover:text-[#B3936D] py-1"
                            >
                                {t.wishlist}
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/checkout');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left text-gray-600 hover:text-[#B3936D] py-1"
                            >
                                {t.checkout}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {isSearchOpen && (
                <div className="fixed inset-0 bg-opacity-30 z-50 flex items-start justify-center pt-20">
                    <div className="bg-white w-full max-w-3xl mx-4 rounded-lg shadow-2xl">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={t.searchPlaceholder}
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#B3936D] focus:outline-none text-lg"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery('');
                                        setSearchResults([]);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Search Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {isSearching ? (
                                    <div className="text-center py-8 text-gray-500">
                                        {t.searching}
                                    </div>
                                ) : searchResults.length === 0 && searchQuery.trim().length > 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        {t.noProducts} "{searchQuery}"
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {searchResults.map((product) => (
                                            <button
                                                key={product.documentId}
                                                onClick={() => handleProductClick(product.documentId)}
                                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                            >
                                                <img
                                                    src={`http://localhost:1337${product.image.url}`}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                                                    <p className="text-[#B3936D] font-semibold">${parseFloat(product.price).toFixed(2)}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed right-0 top-1/2 -translate-y-50 z-50">
                <button
                    onClick={() => window.open('#', '_blank')}
                    className="bg-[#f68e13] text-center text-white w-16 h-16 shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-sm font-bold"
                >
                    {t.moreDemos.split(' ')[0]} <br /> {t.moreDemos.split(' ')[1]}
                </button>
            </div>

            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </nav>
    );
}
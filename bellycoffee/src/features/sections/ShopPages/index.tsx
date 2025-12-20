import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Grid, List, Star, ChevronLeft, ChevronRight, CheckCircle, X } from 'lucide-react';
import {
    fetchProducts,
    setViewType,
    setPriceRange,
    setCurrentPage,
    setSortBy,
    toggleCategory,
    toggleColor,
    toggleTag,
    clearFilters,
    selectAllProducts,
    selectCategories,
    selectColors,
    selectTags,
    selectLoading,
    selectViewType,
    selectPriceRange,
    selectCurrentPage,
    selectSelectedCategories,
    selectSelectedColors,
    selectSelectedTags,
    selectSortBy,
    selectFilteredProducts,
    selectPaginatedProducts,
    selectTotalPages,
} from '../../../Redux/Slices/productSlice';
import { addToCart, selectIsLoggedIn } from '../../../Redux/Slices/cartSlice';
import { selectCurrentLanguage } from '../../../Redux/Slices/languageSlice';
import { translations } from '../../../translations/translations'; 
import type { AppDispatch } from '../../../Redux/Store/store';

const ShopPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<{ message: string; productImage: string } | null>(null);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const currentLang = useSelector(selectCurrentLanguage);
    
    const t = translations[currentLang];
    
    const allProducts = useSelector(selectAllProducts);
    const categories = useSelector(selectCategories);
    const colors = useSelector(selectColors);
    const tags = useSelector(selectTags);
    const loading = useSelector(selectLoading);
    const viewType = useSelector(selectViewType);
    const priceRange = useSelector(selectPriceRange);
    const currentPage = useSelector(selectCurrentPage);
    const selectedCategories = useSelector(selectSelectedCategories);
    const selectedColors = useSelector(selectSelectedColors);
    const selectedTags = useSelector(selectSelectedTags);
    const sortBy = useSelector(selectSortBy);
    const filteredProducts = useSelector(selectFilteredProducts);
    const currentProducts = useSelector(selectPaginatedProducts);
    const totalPages = useSelector(selectTotalPages);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.stopPropagation();
        
        if (!isLoggedIn) {
            alert(t.pleaseLogin);
            navigate('/login');
            return;
        }
        
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        }));
        
        setNotification({
            message: `${product.name} ${t.addedToCart}`,
            productImage: product.image
        });
        
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">{t.loadingShop}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-27.5">
            {notification && (
                <div className="fixed top-24 right-4 z-50 bg-white rounded-lg shadow-2xl overflow-hidden max-w-md animate-slide-in">
                    <div className="flex items-center p-4 gap-3">
                        <div className="shrink-0">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <img 
                            src={notification.productImage} 
                            alt="Product" 
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {notification.message}
                            </p>
                            <button 
                                onClick={() => navigate('/cart')}
                                className="text-xs text-[#B3936B] hover:underline mt-1"
                            >
                                {t.goToCart}
                            </button>
                        </div>
                        <button 
                            onClick={() => setNotification(null)}
                            className="shrink-0 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="h-1 bg-green-500 animate-progress"></div>
                </div>
            )}

            <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes progress {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0%;
                    }
                }
                
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
                
                .animate-progress {
                    animation: progress 3s linear;
                }
            `}</style>

            <div className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-serif mb-4">{t.shopTitle}</h1>
                    <p className="text-gray-600">{t.homeLink} / <span className='text-[#B3936B]'>{t.shopTitle}</span></p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="grid grid-cols-12 gap-8">
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="p-6 mb-6">
                            <h3 className="text-xl mb-4 pb-2 border-b-2 inline-block font-[Rubik]">{t.productCategories}</h3>
                            <ul className="space-y-3 mt-6">
                                {categories.map((category: string, idx: number) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => dispatch(toggleCategory(category))}
                                            className={`text-left w-full hover:text-[#B3936B] flex items-center justify-between ${selectedCategories.includes(category) ? 'text-[#B3936B] font-semibold' : 'text-black'
                                                }`}
                                        >
                                            <span>{category}</span>
                                            <span className="text-sm text-gray-500">
                                                ({allProducts.filter((p: any) => p.category === category).length})
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 mb-6">
                            <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">{t.filterByPrice}</h3>
                            <div className="mt-6">
                                <input
                                    type="range"
                                    min="10"
                                    max="170"
                                    value={priceRange[1]}
                                    onChange={(e) => dispatch(setPriceRange([priceRange[0], parseInt(e.target.value)]))}
                                    className="w-full accent-[#B3936D]"
                                />
                                <p className="text-sm text-gray-600 mt-4">{t.price}: ${priceRange[0]} — ${priceRange[1]}</p>
                                <p className="text-sm text-gray-500 mt-2">{filteredProducts.length} {t.productsFound}</p>
                            </div>
                        </div>

                        {colors.length > 0 && (
                            <div className="bg-white p-6 mb-6">
                                <h3 className="text-xl mb-4 pb-2 border-b-2 font-[Rubik] border-black inline-block">{t.filterByColor}</h3>
                                <ul className="space-y-3 mt-6">
                                    {colors.map((color: any) => (
                                        <li key={color.name} className="flex items-center justify-between">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="mr-3 w-4 h-4 accent-orange-500"
                                                    checked={selectedColors.includes(color.name)}
                                                    onChange={() => dispatch(toggleColor(color.name))}
                                                />
                                                <span className="text-gray-700">{color.name}</span>
                                            </label>
                                            <span className="text-gray-500 text-sm">{color.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tags.length > 0 && (
                            <div className="bg-white p-6 mb-6">
                                <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">{t.productTags}</h3>
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {tags.map((tag: string) => (
                                        <button
                                            key={tag}
                                            onClick={() => dispatch(toggleTag(tag))}
                                            className={`px-4 py-2 text-sm rounded transition-colors ${selectedTags.includes(tag)
                                                    ? 'bg-[#B3936D] text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-[#B3936D] hover:text-white'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedTags.length > 0 || priceRange[1] < 170) && (
                            <div className="bg-white p-6 mb-6 border-t-2 border-[#B3936B] pt-4">
                                <h4 className="text-sm font-semibold mb-3 text-gray-700">{t.activeFilters}</h4>
                                <div className="space-y-2">
                                    {selectedCategories.length > 0 && (
                                        <div>
                                            <span className="text-xs text-gray-500">{t.categories}: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {selectedCategories.map((cat: string) => (
                                                    <span key={cat} className="text-xs px-2 py-1 bg-[#B3936B] text-white rounded">{cat}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {selectedColors.length > 0 && (
                                        <div>
                                            <span className="text-xs text-gray-500">{t.colors}: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {selectedColors.map((color: string) => (
                                                    <span key={color} className="text-xs px-2 py-1 bg-orange-500 text-white rounded">{color}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {selectedTags.length > 0 && (
                                        <div>
                                            <span className="text-xs text-gray-500">{t.tags}: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {selectedTags.map((tag: string) => (
                                                    <span key={tag} className="text-xs px-2 py-1 bg-gray-600 text-white rounded">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="bg-white p-6">
                            <h3 className="text-xl font-[Rubik] mb-4 pb-2 border-b-2 border-black inline-block">{t.topRatedProducts}</h3>
                            <div className="space-y-4 mt-6">
                                {allProducts.slice(0, 2).map((product: any) => (
                                    <div key={product.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                                            <div className="flex items-center gap-1 mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="text-[#B3936D] font-semibold">${product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <main className="col-span-12 lg:col-span-9">
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center space-x-4">
                                <button onClick={() => dispatch(setViewType('grid'))} className={`p-2 ${viewType === 'grid' ? 'bg-gray-200' : ''}`}>
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button onClick={() => dispatch(setViewType('list'))} className={`p-2 ${viewType === 'list' ? 'bg-gray-200' : ''}`}>
                                    <List className="w-5 h-5" />
                                </button>
                                <span className="text-sm text-gray-600">
                                    {t.showing} {currentProducts.length} {t.of} {filteredProducts.length} {t.products}
                                </span>
                            </div>
                            <select className="border border-gray-300 rounded px-4 py-2 text-sm" value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
                                <option value="default">{t.defaultSorting}</option>
                                <option value="price-low">{t.sortPriceLow}</option>
                                <option value="price-high">{t.sortPriceHigh}</option>
                                <option value="latest">{t.sortLatest}</option>
                            </select>
                        </div>

                        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                            {currentProducts.map((product: any) => (
                                <div 
                                    key={product.id} 
                                    className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <div className="relative">
                                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                                        {product.oldPrice > product.price && (
                                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                            </div>
                                        )}
                                        {product.outOfStock && (
                                            <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded">{t.outOfStock}</div>
                                        )}
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-1">({product.rating.toFixed(1)})</span>
                                        </div>
                                        <div className="mb-3">
                                            <span className="text-xl text-[#B3936B] font-semibold">${product.price.toFixed(2)}</span>
                                            {product.oldPrice > product.price && (
                                                <span className="ml-2 text-gray-400 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
                                            )}
                                        </div>
                                        {product.colors.length > 0 && (
                                            <div className="flex justify-center gap-1 mb-3">
                                                {product.colors.map((color: string, idx: number) => (
                                                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">{color}</span>
                                                ))}
                                            </div>
                                        )}
                                        <button 
                                            className="w-full px-6 py-2 border border-gray-300 rounded hover:bg-[#B3936D] hover:text-white hover:border-[#B3936D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                                            disabled={product.outOfStock}
                                            onClick={(e) => handleAddToCart(e, product)}
                                            title={!isLoggedIn && !product.outOfStock ? t.loginToAddToCart : ''}
                                        >
                                            {product.outOfStock ? t.outOfStock : (isLoggedIn ? t.addToCart : t.loginToBuy)}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">{t.noProductsFilters}</p>
                                <button onClick={() => dispatch(clearFilters())} className="mt-4 px-6 py-2 bg-[#B3936D] text-white rounded hover:bg-[#9a7d5a]">
                                    {t.clearFilters}
                                </button>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center p-7 items-center mt-8 gap-2">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`p-2 border rounded ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:border-[#B3936D] hover:text-[#B3936D]'}`}>
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNum = index + 1;
                                    return (
                                        <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`min-w-10 h-10 border rounded ${currentPage === pageNum ? 'bg-[#B3936D] text-white border-[#B3936D]' : 'border-[#B3936D] hover:border-[#B3936D] hover:text-[#B3936D]'}`}>
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 border rounded ${currentPage === totalPages ? 'border-gray-600 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:border-[#B3936D] hover:text-[#B3936D]'}`}>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
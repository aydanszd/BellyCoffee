import { useState, useEffect } from 'react';
import { Heart, Search, Minus, Plus } from 'lucide-react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../Redux/Slices/cartSlice';

interface ProductImage {
  url: string;
}

interface ProductCategory {
  name: string;
}

interface ProductTag {
  name: string;
}

interface Product {
  id: number;
  documentId: string;
  name: string;
  price: string;
  oldprice?: string | null;
  desc?: string;
  OutOfStock: boolean;
  image?: ProductImage;
  product_category?: ProductCategory;
  product_tags?: ProductTag[];
}

const ProductPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ documentId?: string; id?: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const productId = params.documentId || params.id || window.location.pathname.split('/').pop();
    
    console.log('Product ID:', productId); 
    
    const isNumeric = !isNaN(Number(productId));
    const filterParam = isNumeric 
      ? `filters[id][$eq]=${productId}`
      : `filters[documentId][$eq]=${productId}`;
    
    fetch(`http://localhost:1337/api/products?populate=*&${filterParam}`)
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data); 
        if (data.data && data.data.length > 0) {
          setProduct(data.data[0]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [params]);

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && !product.OutOfStock) {
      dispatch(addToCart({
        id: product.documentId,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image?.url ? `http://localhost:1337${product.image.url}` : '',
        quantity: quantity
      }));
      console.log(`${quantity}x ${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  const productImage = product.image?.url 
    ? `http://localhost:1337${product.image.url}`
    : 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-06.jpg';
  
  const images: string[] = [
    productImage,
    'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-5.jpg',
    'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-04.jpg',
    'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-13.jpg'
  ];
  
  const thumbnails = images;

  return (
    <div className="min-h-screen bg-white">
      <div className="mt-35 mb-14">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 text-center mb-6">
            {product.name}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-gray-900 cursor-pointer">Products</span>
            <span>/</span>
            <span className="text-amber-700">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="space-y-4">
            <div className="relative h-125 bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src={images[selectedImage]}
                alt="Product"
                className="w-full h-full object-contain"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex gap-2">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-30 h-30 overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#B3936D]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:-translate-x-20">
            <div>
              <h2 className="text-4xl text-gray-900 mb-4">
                {product.name}
              </h2>
              <div className="flex items-center gap-3">
                <div className="text-xl font-semibold text-[#B3936D]">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
                {product.oldprice && (
                  <div className="text-lg text-gray-400 line-through">
                    ${parseFloat(product.oldprice).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            <div className="inline-flex border border-gray-200 rounded overflow-hidden">
              {[
                { value: '00', label: 'Days' },
                { value: '00', label: 'Hours' },
                { value: '00', label: 'Minutes' },
                { value: '00', label: 'Seconds' }
              ].map((item, index) => (
                <div key={index} className={`text-center h-20 min-w-25 ${index !== 3 ? 'border-r border-gray-200' : ''}`}>
                  <div className="bg-[#B3936D] text-black text-xl py-2">
                    {item.value}
                  </div>
                  <div className="bg-white text-black text-[14px] py-1.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-gray-600 text-[14px] space-y-2">
              {product.desc && product.desc.split('. ').map((sentence, index) => (
                sentence.trim() && <p key={index}>{sentence.trim()}.</p>
              ))}
            </div>

            <div className={`font-medium -mt-5 ${product.OutOfStock ? 'text-red-600' : 'text-green-800'}`}>
              {product.OutOfStock ? 'Out of Stock' : '100000 in stock'}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 overflow-hidden rounded-sm">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  disabled={product.OutOfStock}
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-13 text-center border-x-2 border-gray-200 py-3 font-medium"
                />
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  disabled={product.OutOfStock}
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.OutOfStock}
                className={`text-[14px] py-3 px-8 rounded-sm transition-colors uppercase tracking-wide ${
                  product.OutOfStock 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#B3936D] hover:bg-amber-800 text-white'
                }`}
              >
                {product.OutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            <div className="flex gap-6">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#B3936D] transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? 'fill-[#B3936D] text-[#B3936D]' : ''}`}
                />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-[#B3936D] transition-colors">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  </div>
                </div>
                <span>Compare</span>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">SKU:</span>
                <span className="text-gray-600">WVN-{product.id}-1-1</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">Categories:</span>
                <span className="text-gray-600">{product.product_category?.name || 'N/A'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-gray-900">Tag:</span>
                <span className="text-gray-600">
                  {product.product_tags?.map((tag) => tag.name).join(', ') || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
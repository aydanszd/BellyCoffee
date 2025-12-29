import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../../../Redux/Slices/cartSlice';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface RootState {
    cart: {
        items: CartItem[];
    };
}

export default function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const calculateSubtotal = (): number => {
        return cartItems.reduce((total: number, item: CartItem) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const handleQuantityChange = (id: string, newQuantity: number): void => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleRemoveItem = (id: string): void => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = (): void => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            dispatch(clearCart());
        }
    };

    const subtotal = calculateSubtotal();
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-8">Add some products to your cart to get started!</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-[#B3936D] text-white px-8 py-3 rounded-lg hover:bg-[#9d7d5a] transition-colors font-medium"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100 border-b">
                                        <tr>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Product</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Price</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Quantity</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Total</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item: CartItem) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-lg"
                                                            onError={(e) => {
                                                                const target = e.currentTarget;
                                                                target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                                            }}
                                                        />
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="text-[#B3936D] font-semibold">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="text-gray-900 font-bold">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="md:hidden divide-y">
                                {cartItems.map((item: CartItem) => (
                                    <div key={item.id} className="p-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.src = 'https://via.placeholder.com/96x96?text=No+Image';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                                                <p className="text-[#B3936D] font-semibold mb-3">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 p-2"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <div className="mt-2 text-right">
                                                    <span className="text-gray-900 font-bold">
                                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50 border-t">
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-500 hover:text-red-700 transition-colors font-medium flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal:</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping:</span>
                                    <span className="font-medium">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total:</span>
                                        <span className="text-[#B3936D]">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-[#B3936D] text-white py-3 rounded-lg hover:bg-[#9d7d5a] transition-colors font-medium mb-3"
                            >
                                Proceed to Checkout
                            </button>
                            
                            <button
                                onClick={() => navigate('/shop')}
                                className="w-full border-2 border-[#B3936D] text-[#B3936D] py-3 rounded-lg hover:bg-[#B3936D] hover:text-white transition-colors font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
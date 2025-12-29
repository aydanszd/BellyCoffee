import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Truck, MapPin, User, Mail, Phone, Package } from 'lucide-react';
import { clearCart } from '../../../Redux/Slices/cartSlice';
interface CartItem {
    id: string | number;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

interface RootState {
    cart: {
        items: CartItem[];
    };
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    orderNotes: string;
}

interface OrderItem {
    id: string | number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    items: OrderItem[];
    customerInfo: FormData;
}

export default function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        orderNotes: ''
    });

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateSubtotal = (): number => {
        return cartItems.reduce((total: number, item: CartItem) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.1; 
    const total = subtotal + shipping + tax;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            const newOrder: Order = {
                id: 'ORD-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 3).toUpperCase(),
                date: new Date().toISOString().split('T')[0],
                status: 'processing',
                total: total,
                items: cartItems.map((item: CartItem): OrderItem => ({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: parseFloat(item.price),
                    quantity: item.quantity
                })),
                customerInfo: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    orderNotes: formData.orderNotes
                }
            };

            const existingOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
            existingOrders.unshift(newOrder);
            localStorage.setItem('orders', JSON.stringify(existingOrders));

            setIsProcessing(false);
            dispatch(clearCart());
            
            navigate('/orders', { 
                state: { 
                    message: 'Order placed successfully!',
                    orderId: newOrder.id 
                } 
            });
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-8">Add some products before checkout!</p>
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your order</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <User className="w-5 h-5 text-[#B3936D]" />
                                    <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                            placeholder="John"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Truck className="w-5 h-5 text-[#B3936D]" />
                                    <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Street Address *
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="123 Main Street, Apartment 4B"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="New York"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State/Province *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                required
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="NY"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ZIP/Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                required
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="10001"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                required
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none"
                                                placeholder="United States"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Notes (Optional)</h3>
                                <textarea
                                    name="orderNotes"
                                    value={formData.orderNotes}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B3936D] focus:border-transparent outline-none resize-none"
                                    placeholder="Any special instructions for your order?"
                                ></textarea>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                    {cartItems.map((item: CartItem) => (
                                        <div key={item.id} className="flex gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-[#B3936D]">
                                                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 py-4 border-t border-b">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal:</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping:</span>
                                        <span className="font-medium">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (10%):</span>
                                        <span className="font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 mb-6">
                                    <span>Total:</span>
                                    <span className="text-[#B3936D]">${total.toFixed(2)}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-[#B3936D] text-white py-3 rounded-lg hover:bg-[#9d7d5a] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <Package className="w-4 h-4" />
                                    <span>Cash on Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
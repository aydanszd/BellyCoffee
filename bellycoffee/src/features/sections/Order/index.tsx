import { useState, useEffect, type JSX } from 'react';
import { Package, Eye, Truck, CheckCircle, Clock, XCircle, Search, X } from 'lucide-react';
interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}

interface Order {
    id: string;
    date: string;
    status: 'processing' | 'shipping' | 'delivered' | 'cancelled';
    items: OrderItem[];
    total: number;
    customerInfo?: CustomerInfo;
}

interface StrapiImage {
    url?: string;
}

interface StrapiOrder {
    name?: string;
}

interface StrapiProduct {
    id: number;
    name: string;
    price: string | number;
    publishedAt: string;
    image?: StrapiImage;
    order?: StrapiOrder;
}

interface StrapiResponse {
    data: StrapiProduct[];
}

type StatusFilterType = 'all' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [successOrderId, setSuccessOrderId] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:1337/api/products?populate=*');
            const data: StrapiResponse = await response.json();
            
            const ordersByStatus: Record<string, Order> = {};
            
            data.data.forEach((product: StrapiProduct) => {
                const orderStatus = (product.order?.name?.toLowerCase() || 'processing') as Order['status'];
                
                if (!ordersByStatus[orderStatus]) {
                    const orderId = `ORD-${orderStatus.toUpperCase()}-STRAPI`;
                    ordersByStatus[orderStatus] = {
                        id: orderId,
                        date: new Date(product.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        }),
                        status: orderStatus,
                        items: [],
                        total: 0
                    };
                }
                
                const item: OrderItem = {
                    id: product.id,
                    name: product.name,
                    price: parseFloat(String(product.price)),
                    quantity: 1,
                    image: `http://localhost:1337${product.image?.url || ''}`
                };
                
                ordersByStatus[orderStatus].items.push(item);
                ordersByStatus[orderStatus].total += item.price;
            });
            
            const strapiOrders = Object.values(ordersByStatus);
            const localOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
            const filteredLocalOrders = localOrders.filter(order => !order.id.includes('STRAPI'));
            const allOrders = [...filteredLocalOrders, ...strapiOrders];
            
            setOrders(allOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            const savedOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
            setOrders(savedOrders);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: Order['status']): JSX.Element => {
        const statusConfig = {
            processing: {
                color: 'bg-blue-100 text-blue-800',
                icon: <Clock className="w-4 h-4" />,
                text: 'Processing'
            },
            shipping: {
                color: 'bg-yellow-100 text-yellow-800',
                icon: <Truck className="w-4 h-4" />,
                text: 'Shipping'
            },
            delivered: {
                color: 'bg-green-100 text-green-800',
                icon: <CheckCircle className="w-4 h-4" />,
                text: 'Delivered'
            },
            cancelled: {
                color: 'bg-red-100 text-red-800',
                icon: <XCircle className="w-4 h-4" />,
                text: 'Cancelled'
            }
        };

        const config = statusConfig[status] || statusConfig.processing;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                {config.icon}
                {config.text}
            </span>
        );
    };

    const getStatusIcon = (status: Order['status']): JSX.Element => {
        const icons = {
            processing: <Clock className="w-6 h-6" />,
            shipping: <Truck className="w-6 h-6" />,
            delivered: <CheckCircle className="w-6 h-6" />,
            cancelled: <XCircle className="w-6 h-6" />
        };
        return icons[status];
    };

    const getStatusColor = (status: Order['status']): string => {
        const colors = {
            processing: 'border-blue-200 bg-blue-50',
            shipping: 'border-yellow-200 bg-yellow-50',
            delivered: 'border-green-200 bg-green-50',
            cancelled: 'border-red-200 bg-red-50'
        };
        return colors[status];
    };

    const filteredOrders = orders.filter((order: Order) => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.items.some((item: OrderItem) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    const groupedOrders = {
        processing: filteredOrders.filter(o => o.status === 'processing'),
        shipping: filteredOrders.filter(o => o.status === 'shipping'),
        delivered: filteredOrders.filter(o => o.status === 'delivered'),
        cancelled: filteredOrders.filter(o => o.status === 'cancelled')
    };

    const handleViewDetails = (order: Order): void => {
        setSelectedOrder(order);
    };

    const OrderCard = ({ order }: { order: Order }) => (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                {getStatusBadge(order.status)}
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
                {order.items.slice(0, 4).map((item: OrderItem, idx: number) => (
                    <img
                        key={idx}
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded object-cover"
                        title={item.name}
                    />
                ))}
                {order.items.length > 4 && (
                    <div className="w-14 h-14 rounded bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                        +{order.items.length - 4}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t">
                <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
                <button
                    onClick={() => handleViewDetails(order)}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                    <Eye className="w-4 h-4" />
                    View
                </button>
            </div>
        </div>
    );

    const StatusSection = ({ status, orders, title }: { status: Order['status'], orders: Order[], title: string }) => {
        if (orders.length === 0) return null;

        return (
            <div className={`border-2 rounded-xl p-6 ${getStatusColor(status)}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${status === 'processing' ? 'bg-blue-200' : status === 'shipping' ? 'bg-yellow-200' : status === 'delivered' ? 'bg-green-200' : 'bg-red-200'}`}>
                        {getStatusIcon(status)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-600">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order: Order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-600">Track and manage your orders</p>
                </div>
                {showSuccessMessage && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg shadow-md animate-fade-in">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <div>
                                    <h3 className="font-semibold text-green-800">Order Placed Successfully! 🎉</h3>
                                    <p className="text-sm text-green-700">
                                        Your order <span className="font-bold">{successOrderId}</span> has been received and is being processed.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSuccessMessage(false)}
                                className="text-green-700 hover:text-green-900"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders by ID or product name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="all">All Status</option>
                            <option value="processing">Processing</option>
                            <option value="shipping">Shipping</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading orders...</p>
                    </div>
                ) : (
                    <>
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <StatusSection 
                                    status="processing" 
                                    orders={groupedOrders.processing} 
                                    title="Processing Orders" 
                                />

                                <StatusSection 
                                    status="shipping" 
                                    orders={groupedOrders.shipping} 
                                    title="Shipping Orders" 
                                />
                                <StatusSection 
                                    status="delivered" 
                                    orders={groupedOrders.delivered} 
                                    title="Delivered Orders" 
                                />

                                <StatusSection 
                                    status="cancelled" 
                                    orders={groupedOrders.cancelled} 
                                    title="Cancelled Orders" 
                                />
                            </div>
                        )}
                    </>
                )}

                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="font-semibold text-gray-900">{selectedOrder.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-semibold text-gray-900">{selectedOrder.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="font-semibold text-gray-900">${selectedOrder.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                {selectedOrder.customerInfo && (
                                    <div className="border-t pt-6 mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Shipping Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Name</p>
                                                <p className="font-medium">{selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Email</p>
                                                <p className="font-medium">{selectedOrder.customerInfo.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Phone</p>
                                                <p className="font-medium">{selectedOrder.customerInfo.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Address</p>
                                                <p className="font-medium">
                                                    {selectedOrder.customerInfo.address}, {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} {selectedOrder.customerInfo.zipCode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items.map((item: OrderItem) => (
                                            <div key={item.id} className="flex gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                    <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
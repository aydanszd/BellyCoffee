import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './Redux/Slices/cartSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
};

import { createBrowserRouter } from 'react-router';
import Layout from './layout';
import HomePage from './features/pages/Home';
import ContactUs from './features/pages/ContactUs';
import BlogPage from './features/pages/Blog';
import AboutUs from './features/pages/AboutUs';
import ShopPage from './features/pages/Shop';
import ProductDetailPage from './features/pages/ProductDetails';
import Login from './features/pages/Login';
import Register from './features/pages/Register';
import Basket from './features/pages/Basket';
import CheckOutPage from './features/pages/CheckOut';
import OrdersPage from './features/sections/Order';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'ContactUs',
                element: <ContactUs />,
            },
            {
                path: 'Blog',
                element: <BlogPage />,
            },
            {
                path: 'AboutUs',
                element: <AboutUs />,
            },
            {
                path: 'Shop',
                element: <ShopPage />,
            },
            {
                path: 'product/:id',
                element: <ProductDetailPage />,
            },
            {
                path: 'cart',
                element: (
                    <ProtectedRoute>
                        <Basket />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'checkout',
                element: (
                    <ProtectedRoute>
                        <CheckOutPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'orders',
                element: (
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/',
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);
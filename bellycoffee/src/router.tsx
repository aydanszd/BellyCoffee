import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import HomePage from './features/pages/Home'
import ContactUs from './features/pages/ContactUs'
import BlogPage from './features/pages/Blog'
import AboutUs from './features/pages/AboutUs'
import ShopPage from './features/pages/Shop'

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
        ],
    },
])
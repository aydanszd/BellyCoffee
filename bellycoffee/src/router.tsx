import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import HomePage from './features/pages/Home'  

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, 
                element: <HomePage />,
            },
        ],
    },
])
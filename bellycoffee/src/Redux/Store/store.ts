import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slices/productSlice';
import cartReducer from '../Slices/cartSlice';
import languageReducer from '../Slices/languageSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        language: languageReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: typeof window !== 'undefined' && import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
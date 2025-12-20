import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isLoggedIn: boolean;
}

const isUserLoggedIn = (): boolean => {
    try {
        const user = localStorage.getItem('user');
        return !!user;
    } catch (error) {
        return false;
    }
};

const loadCartFromStorage = (): CartItem[] => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
};

const saveCartToStorage = (items: CartItem[]) => {
    try {
        localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

const initialState: CartState = {
    items: loadCartFromStorage(),
    isLoggedIn: isUserLoggedIn(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += (action.payload.quantity || 1);
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                });
            }
            saveCartToStorage(state.items);
        },
        
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToStorage(state.items);
        },
        
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
            saveCartToStorage(state.items);
        },
        
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
        
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                saveCartToStorage(state.items);
            }
        },
        
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
                saveCartToStorage(state.items);
            }
        },
        
        syncCart: (state) => {
            const loggedIn = isUserLoggedIn();
            state.isLoggedIn = loggedIn;
            
            if (loggedIn) {
                state.items = loadCartFromStorage();
            } else {
                state.items = [];
                localStorage.removeItem('cart');
            }
        },
        
        setLoginStatus: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
            if (!action.payload) {
                state.items = [];
                localStorage.removeItem('cart');
            }
        },
    },
});

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    incrementQuantity,
    decrementQuantity,
    syncCart,
    setLoginStatus
} = cartSlice.actions;

interface RootState {
    cart: CartState;
}

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) => 
    state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectCartItemsCount = (state: RootState) => state.cart.items.length;

export const selectCartTotalQuantity = (state: RootState) => 
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectIsLoggedIn = (state: RootState) => state.cart.isLoggedIn;

export default cartSlice.reducer;
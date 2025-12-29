import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:1337';

export interface Product {
    id: number;
    documentId: string;
    name: string;
    desc: string;
    price: number;
    oldPrice: number;
    outOfStock: boolean;
    image: string;
    category: string;
    categoryId: number;
    colors: string[];
    tags: string[];
    rating: number;
    countdown: boolean;
}

export interface ColorCount {
    name: string;
    count: number;
}

interface ProductState {
    allProducts: Product[];
    categories: string[];
    colors: ColorCount[];
    tags: string[];
    loading: boolean;
    error: string | null;
    viewType: 'grid' | 'list';
    priceRange: [number, number];
    currentPage: number;
    selectedCategories: string[];
    selectedColors: string[];
    selectedTags: string[];
    sortBy: string;
    itemsPerPage: number;
}
interface FetchProductsResponse {
    products: Product[];
    categories: string[];
    colors: ColorCount[];
    tags: string[];
}

const initialState: ProductState = {
    allProducts: [],
    categories: [],
    colors: [],
    tags: [],
    loading: false,
    error: null,
    viewType: 'grid',
    priceRange: [10, 170],
    currentPage: 1,
    selectedCategories: [],
    selectedColors: [],
    selectedTags: [],
    sortBy: 'default',
    itemsPerPage: 12,
};
export const fetchProducts = createAsyncThunk<FetchProductsResponse>(
    'products/fetchProducts',
    async () => {
        const response = await fetch(`${API_URL}/api/products?populate=*`);
        const data = await response.json();

        const formattedProducts: Product[] = data.data.map((item: any) => {
            let imageUrl = 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-07.jpg';

            if (item.image?.url) {
                imageUrl = `${API_URL}${item.image.url}`;
            }
            return {
                id: item.id,
                documentId: item.documentId,
                name: item.name,
                desc: item.desc,
                price: parseFloat(item.price),
                oldPrice: parseFloat(item.oldprice),
                outOfStock: item.OutOfStock,
                image: imageUrl,
                category: item.product_category?.name || 'Uncategorized',
                categoryId: item.product_category?.id,
                colors: item.product_colors?.map((c: any) => c.name) || [],
                tags: item.product_tags?.map((t: any) => t.name) || [],
                rating: 3 + Math.random() * 2,
                countdown: false,
            };
        });

        const uniqueCategories = [...new Set(formattedProducts.map((p) => p.category))];

        const colorCounts: Record<string, number> = {};
        formattedProducts.forEach((p) => {
            p.colors.forEach((color: string) => {
                colorCounts[color] = (colorCounts[color] || 0) + 1;
            });
        });
        const uniqueColors: ColorCount[] = Object.entries(colorCounts).map(([name, count]) => ({
            name,
            count
        }));

        const uniqueTags = [...new Set(formattedProducts.flatMap((p) => p.tags))];

        return {
            products: formattedProducts,
            categories: uniqueCategories,
            colors: uniqueColors,
            tags: uniqueTags,
        };
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setViewType: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.viewType = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<[number, number]>) => {
            state.priceRange = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
            state.currentPage = 1;
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            if (state.selectedCategories.includes(category)) {
                state.selectedCategories = state.selectedCategories.filter(c => c !== category);
            } else {
                state.selectedCategories.push(category);
            }
            state.currentPage = 1;
        },
        toggleColor: (state, action: PayloadAction<string>) => {
            const color = action.payload;
            if (state.selectedColors.includes(color)) {
                state.selectedColors = state.selectedColors.filter(c => c !== color);
            } else {
                state.selectedColors.push(color);
            }
            state.currentPage = 1;
        },
        toggleTag: (state, action: PayloadAction<string>) => {
            const tag = action.payload;
            if (state.selectedTags.includes(tag)) {
                state.selectedTags = state.selectedTags.filter(t => t !== tag);
            } else {
                state.selectedTags.push(tag);
            }
            state.currentPage = 1;
        },
        clearFilters: (state) => {
            state.selectedCategories = [];
            state.selectedColors = [];
            state.selectedTags = [];
            state.priceRange = [10, 170];
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload.products;
                state.categories = action.payload.categories;
                state.colors = action.payload.colors;
                state.tags = action.payload.tags;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const {
    setViewType,
    setPriceRange,
    setCurrentPage,
    setSortBy,
    toggleCategory,
    toggleColor,
    toggleTag,
    clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
export const selectAllProducts = (state: any) => state.products.allProducts;
export const selectCategories = (state: any) => state.products.categories;
export const selectColors = (state: any) => state.products.colors;
export const selectTags = (state: any) => state.products.tags;
export const selectLoading = (state: any) => state.products.loading;
export const selectViewType = (state: any) => state.products.viewType;
export const selectPriceRange = (state: any) => state.products.priceRange;
export const selectCurrentPage = (state: any) => state.products.currentPage;
export const selectSelectedCategories = (state: any) => state.products.selectedCategories;
export const selectSelectedColors = (state: any) => state.products.selectedColors;
export const selectSelectedTags = (state: any) => state.products.selectedTags;
export const selectSortBy = (state: any) => state.products.sortBy;

export const selectFilteredProducts = (state: any): Product[] => {
    const {
        allProducts,
        priceRange,
        selectedCategories,
        selectedColors,
        selectedTags,
        sortBy,
    } = state.products;

    let filtered = [...allProducts];

    filtered = filtered.filter(
        p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedColors.length > 0) {
        filtered = filtered.filter(p =>
            p.colors.some((color: string) => selectedColors.includes(color))
        );
    }

    if (selectedTags.length > 0) {
        filtered = filtered.filter(p =>
            p.tags.some((tag: string) => selectedTags.includes(tag))
        );
    }

    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'latest') {
        filtered.reverse();
    }

    return filtered;
};

export const selectPaginatedProducts = (state: any): Product[] => {
    const filteredProducts = selectFilteredProducts(state);
    const { currentPage, itemsPerPage } = state.products;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
};

export const selectTotalPages = (state: any): number => {
    const filteredProducts = selectFilteredProducts(state);
    const itemsPerPage = state.products.itemsPerPage;
    return Math.ceil(filteredProducts.length / itemsPerPage);
};
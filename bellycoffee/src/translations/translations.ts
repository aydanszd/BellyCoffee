export const translations = {
    en: {
        home: 'HOME',
        shop: 'SHOP',
        blog: 'BLOG',
        aboutUs: 'ABOUT US',
        contactUs: 'CONTACT US',
        logout: 'Logout',
        myAccount: 'My Account',
        wishlist: 'Wishlist',
        checkout: 'Checkout',
        searchPlaceholder: 'Search products by name...',
        searching: 'Searching...',
        noProducts: 'No products found for',
        moreDemos: 'MORE DEMOS'
    },
    ru: {
        home: 'ГЛАВНАЯ',
        shop: 'МАГАЗИН',
        blog: 'БЛОГ',
        aboutUs: 'О НАС',
        contactUs: 'КОНТАКТЫ',
        logout: 'Выйти',
        myAccount: 'Мой аккаунт',
        wishlist: 'Избранное',
        checkout: 'Оформить',
        searchPlaceholder: 'Поиск товаров по названию...',
        searching: 'Поиск...',
        noProducts: 'Товары не найдены для',
        moreDemos: 'БОЛЬШЕ ДЕМО'
    },
    az: {
        home: 'ANA SƏHİFƏ',
        shop: 'MAĞAZA',
        blog: 'BLOQ',
        aboutUs: 'HAQQIMIZDA',
        contactUs: 'ƏLAQƏ',
        logout: 'Çıxış',
        myAccount: 'Hesabım',
        wishlist: 'İstək siyahısı',
        checkout: 'Ödəniş',
        searchPlaceholder: 'Məhsulları ada görə axtar...',
        searching: 'Axtarılır...',
        noProducts: 'Məhsul tapılmadı',
        moreDemos: 'DAHA ÇOX DEMO'
    }
};

export type Language = 'en' | 'ru' | 'az';
export type TranslationKeys = keyof typeof translations.en;
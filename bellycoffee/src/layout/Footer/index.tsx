import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Facebook, Twitter, Instagram, Linkedin, Rss, Phone, Truck, RotateCcw, Bell, Clock } from 'lucide-react';
import { selectCurrentLanguage } from '../../Redux/Slices/languageSlice';
const footerTranslations = {
    en: {
        newsletterTitle: 'Join Our Newsletter Now',
        newsletterDesc: 'Get E-mail updates about our latest shop and special offers.',
        emailPlaceholder: 'Your Email Address...',
        subscribeBtn: 'Subscribe!',
        contactUs: 'Contact Us',
        address: 'Address:',
        addressText: '123 Main Street, Anytown, CA 12345 – USA.',
        email: 'Email:',
        emailText: 'Contact@domain.com',
        information: 'Information',
        aboutUs: 'About Us',
        contact: 'Contact',
        privacyPolicy: 'Privacy Policy',
        faq: 'Frequently Questions',
        customerService: 'Customer Service',
        deliveryInfo: 'Delivery Information',
        myAccount: 'My Account',
        cart: 'Cart',
        wishlist: 'Wishlist',
        checkout: 'Checkout',
        photoInstagram: 'Photo Instagram',
        freeShipping: 'Free Shipping',
        freeShippingDesc: 'Free shipping on all order',
        moneyReturn: 'Money Return',
        moneyReturnDesc: 'Back guarantee under 7 days',
        memberDiscount: 'Member Discount',
        memberDiscountDesc: 'On every order over $120.00',
        onlineSupport: 'Online Support',
        onlineSupportDesc: 'Support online 24 hours a day',
        copyright: '© Copyright 2025',
        allRights: '- All Rights Reserved – Powered by WooVina Theme.',
    },
    ru: {
        newsletterTitle: 'Подпишитесь на нашу рассылку',
        newsletterDesc: 'Получайте обновления о нашем магазине и специальных предложениях.',
        emailPlaceholder: 'Ваш Email адрес...',
        subscribeBtn: 'Подписаться!',
        contactUs: 'Свяжитесь с нами',
        address: 'Адрес:',
        addressText: '123 Main Street, Anytown, CA 12345 – США.',
        email: 'Email:',
        emailText: 'Contact@domain.com',
        information: 'Информация',
        aboutUs: 'О нас',
        contact: 'Контакты',
        privacyPolicy: 'Политика конфиденциальности',
        faq: 'Часто задаваемые вопросы',
        customerService: 'Служба поддержки',
        deliveryInfo: 'Информация о доставке',
        myAccount: 'Мой аккаунт',
        cart: 'Корзина',
        wishlist: 'Избранное',
        checkout: 'Оформить заказ',
        photoInstagram: 'Фото Instagram',
        freeShipping: 'Бесплатная доставка',
        freeShippingDesc: 'Бесплатная доставка всех заказов',
        moneyReturn: 'Возврат денег',
        moneyReturnDesc: 'Гарантия возврата в течение 7 дней',
        memberDiscount: 'Скидка участникам',
        memberDiscountDesc: 'На каждый заказ свыше $120.00',
        onlineSupport: 'Онлайн поддержка',
        onlineSupportDesc: 'Поддержка онлайн 24 часа в сутки',
        copyright: '© Copyright 2025',
        allRights: '- Все права защищены – Powered by WooVina Theme.',
    },
    az: {
        newsletterTitle: 'Xəbər bülletenimizə qoşulun',
        newsletterDesc: 'Mağazamız və xüsusi təkliflərimiz haqqında yeniliklərdən xəbərdar olun.',
        emailPlaceholder: 'Email ünvanınız...',
        subscribeBtn: 'Abunə ol!',
        contactUs: 'Bizimlə əlaqə',
        address: 'Ünvan:',
        addressText: '123 Main Street, Anytown, CA 12345 – ABŞ.',
        email: 'Email:',
        emailText: 'Contact@domain.com',
        information: 'Məlumat',
        aboutUs: 'Haqqımızda',
        contact: 'Əlaqə',
        privacyPolicy: 'Məxfilik Siyasəti',
        faq: 'Tez-tez verilən suallar',
        customerService: 'Müştəri xidməti',
        deliveryInfo: 'Çatdırılma məlumatı',
        myAccount: 'Hesabım',
        cart: 'Səbət',
        wishlist: 'İstək siyahısı',
        checkout: 'Ödəniş',
        photoInstagram: 'Instagram Şəkilləri',
        freeShipping: 'Pulsuz çatdırılma',
        freeShippingDesc: 'Bütün sifarişlərə pulsuz çatdırılma',
        moneyReturn: 'Pul geri qaytarılması',
        moneyReturnDesc: '7 gün ərzində geri qaytarma zəmanəti',
        memberDiscount: 'Üzv endirimi',
        memberDiscountDesc: '$120.00-dan yuxarı hər sifarişə',
        onlineSupport: 'Onlayn dəstək',
        onlineSupportDesc: 'Günün 24 saatı onlayn dəstək',
        copyright: '© Copyright 2025',
        allRights: '- Bütün hüquqlar qorunur – Powered by WooVina Theme.',
    }
};

const Footer = () => {
    const [email, setEmail] = useState('');
    const currentLang = useSelector(selectCurrentLanguage);

    const t = footerTranslations[currentLang];

    const handleSubscribe = () => {
        if (email) {
            alert(`Subscribed with: ${email}`);
            setEmail('');
        }
    };

    const instagramPhotos = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop',
    ];

    const informationLinks = [
        { key: 'aboutUs', label: t.aboutUs },
        { key: 'contact', label: t.contact },
        { key: 'privacyPolicy', label: t.privacyPolicy },
        { key: 'faq', label: t.faq },
        { key: 'customerService', label: t.customerService },
        { key: 'deliveryInfo', label: t.deliveryInfo },
    ];

    const accountLinks = [
        { key: 'myAccount', label: t.myAccount },
        { key: 'cart', label: t.cart },
        { key: 'wishlist', label: t.wishlist },
        { key: 'checkout', label: t.checkout },
        { key: 'aboutUs', label: t.aboutUs },
        { key: 'contact', label: t.contact },
    ];

    const features = [
        { icon: Truck, title: t.freeShipping, desc: t.freeShippingDesc },
        { icon: RotateCcw, title: t.moneyReturn, desc: t.moneyReturnDesc },
        { icon: Bell, title: t.memberDiscount, desc: t.memberDiscountDesc },
        { icon: Clock, title: t.onlineSupport, desc: t.onlineSupportDesc },
    ];

    return (
        <footer className="bg-gray-950 text-gray-400 relative">
            <div className="bg-gray-950 py-16 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                                {t.newsletterTitle}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {t.newsletterDesc}
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.emailPlaceholder}
                                className="px-6 py-4 bg-[#1a1d23] text-gray-300 rounded w-full md:w-96 focus:outline-none focus:ring-1 focus:ring-amber-600 placeholder-gray-600"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="px-8 py-4 bg-[#c9a063] hover:bg-[#b38f55] text-white font-medium rounded transition-colors duration-300 whitespace-nowrap uppercase text-sm tracking-wide"
                            >
                                {t.subscribeBtn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">{t.contactUs}</h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#c9a063] rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white text-lg font-medium">+ (012) 800 456 789</span>
                            </div>
                            <div className="text-sm">
                                <p className="mb-1"><span className="text-white">{t.address}</span> {t.addressText}</p>
                                <p><span className="text-white">{t.email}</span> {t.emailText}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-8">
                            {[Facebook, Twitter, Instagram, Linkedin, Rss].map((Icon, index) => (
                                <button
                                    key={index}
                                    className="w-10 h-10 bg-[#2a2d35] hover:bg-[#c9a063] rounded-full flex items-center justify-center transition-colors duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">{t.information}</h3>
                        <ul className="space-y-3 text-sm">
                            {informationLinks.map((item) => (
                                <li key={item.key}>
                                    <a href="#" className="hover:text-white transition-colors duration-300">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">{t.myAccount}</h3>
                        <ul className="space-y-3 text-sm">
                            {accountLinks.map((item) => (
                                <li key={item.key}>
                                    <a href="#" className="hover:text-white transition-colors duration-300">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif text-white mb-8">{t.photoInstagram}</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {instagramPhotos.map((photo, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="relative group overflow-hidden rounded aspect-square"
                                >
                                    <img
                                        src={photo}
                                        alt={`Instagram ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-16 h-16 border-2 border-gray-700 rounded-full flex items-center justify-center shrink-0">
                                    <feature.icon className="w-7 h-7 text-gray-600" />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-white font-medium mb-1 text-lg">{feature.title}</h4>
                                    <p className="text-sm text-gray-500">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-gray-500 text-center md:text-left m-auto">
                            {t.copyright}{' '}
                            <a href="#" className="text-[#c9a063] hover:underline font-medium">
                                Belly
                            </a>
                            {' '}{t.allRights}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
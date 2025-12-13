import React, { useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../Redux/Slices/languageSlice';

interface BlogPost {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    comments: number;
    date: string;
}
const blogLayoutTranslations = {
    en: {
        title: "Blog",
        home: "Home",
        comments: "COMMENTS",
        search: "Search",
        searchPlaceholder: "Search",
        categories: "Categories",
        archives: "Archives",
        categoriesList: ['Business', 'Fashion', 'Furniture', 'Interior', 'Travel'],
        posts: [
            {
                id: 1,
                category: 'TRAVEL',
                title: 'Blog image post (sticky)',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog4-870x530.jpg',
                comments: 0,
                date: 'APRIL 5, 2023'
            },
            {
                id: 2,
                category: 'FASHION',
                title: 'Sample post with format image',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog6-870x530.jpg',
                comments: 0,
                date: 'FEBRUARY 8, 2023'
            },
            {
                id: 3,
                category: 'INTERIOR',
                title: 'Design trends 2023',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog2-870x530.jpg',
                comments: 3,
                date: 'JANUARY 20, 2023'
            },
            {
                id: 4,
                category: 'TRAVEL',
                title: 'Traveling tips',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog3-870x530.jpg',
                comments: 1,
                date: 'FEBRUARY 14, 2023'
            }
        ]
    },
    ru: {
        title: "Блог",
        home: "Главная",
        comments: "КОММЕНТАРИЕВ",
        search: "Поиск",
        searchPlaceholder: "Поиск",
        categories: "Категории",
        archives: "Архивы",
        categoriesList: ['Бизнес', 'Мода', 'Мебель', 'Интерьер', 'Путешествия'],
        posts: [
            {
                id: 1,
                category: 'ПУТЕШЕСТВИЯ',
                title: 'Пост с изображением (закреплен)',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog4-870x530.jpg',
                comments: 0,
                date: '5 АПРЕЛЯ 2023'
            },
            {
                id: 2,
                category: 'МОДА',
                title: 'Пример поста с форматом изображения',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog6-870x530.jpg',
                comments: 0,
                date: '8 ФЕВРАЛЯ 2023'
            },
            {
                id: 3,
                category: 'ИНТЕРЬЕР',
                title: 'Тренды дизайна 2023',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog2-870x530.jpg',
                comments: 3,
                date: '20 ЯНВАРЯ 2023'
            },
            {
                id: 4,
                category: 'ПУТЕШЕСТВИЯ',
                title: 'Советы путешественникам',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog3-870x530.jpg',
                comments: 1,
                date: '14 ФЕВРАЛЯ 2023'
            }
        ]
    },
    az: {
        title: "Bloq",
        home: "Ana səhifə",
        comments: "ŞƏRH",
        search: "Axtarış",
        searchPlaceholder: "Axtarış",
        categories: "Kateqoriyalar",
        archives: "Arxivlər",
        categoriesList: ['Biznes', 'Moda', 'Mebel', 'İnteryer', 'Səyahət'],
        posts: [
            {
                id: 1,
                category: 'SƏYAHƏT',
                title: 'Şəkilli blog yazısı (sabitlənmiş)',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog4-870x530.jpg',
                comments: 0,
                date: '5 APRELl 2023'
            },
            {
                id: 2,
                category: 'MODA',
                title: 'Şəkil formatında nümunə yazı',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog6-870x530.jpg',
                comments: 0,
                date: '8 FEVRAL 2023'
            },
            {
                id: 3,
                category: 'İNTERYER',
                title: 'Dizayn trendləri 2023',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog2-870x530.jpg',
                comments: 3,
                date: '20 YANVAR 2023'
            },
            {
                id: 4,
                category: 'SƏYAHƏT',
                title: 'Səyahət məsləhətləri',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate volutpat tellus fringilla eu. Phasellus rhoncus varius tortor, non ultricies felis condimentum…',
                image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/10/blog3-870x530.jpg',
                comments: 1,
                date: '14 FEVRAL 2023'
            }
        ]
    }
};

const BlogLayout: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const currentLang = useSelector(selectCurrentLanguage);
    
    const t = blogLayoutTranslations[currentLang];
    const posts = t.posts;
    const categories = t.categoriesList;

    const archives = [
        { price: '70-140', image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-11-300x300.jpg', name: 'Maecenas eget congue' },
        { price: '80-110', image: 'https://demo-22.woovinapro.com/wp-content/uploads/2018/09/product-08-300x300.jpg', name: 'Maecenas eget congue' }
    ];

    const pageSize = 2;
    const startIndex = (currentPage - 1) * pageSize;
    const displayedPosts = posts.slice(startIndex, startIndex + pageSize);

    return (
        <div className="bg-white min-h-screen mt-37.5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-[Rubik] mb-4 ">{t.title}</h1>
                    <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                        <span className='font-normal'>{t.home}</span>
                        <span>/</span>
                        <span className='text-[#B3936D] font-normal'>{t.title}</span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-3 ">
                        <div className="space-y-8 ">
                            {displayedPosts.map((post) => (
                                <article key={post.id} className="bg-white  overflow-hidden flex border-b border-gray-200 pb-1">
                                    <div className="relative w-100 h-62.5 shrink-0 overflow-hidden ">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-8 flex-1">
                                        <div className="text-xs font-bold text-black mb-3 tracking-wider">
                                            {post.category}
                                        </div>
                                        <h2 className="text-3xl  mb-4 hover:text-gray-600 transition-colors cursor-pointer">
                                            {post.title}
                                        </h2>
                                        <p className=" border-b text-[14px] border-gray-200 pb-4 text-gray-600 leading-relaxed mb-6">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-black -mt-1">
                                                <MessageCircle className='-mt-0.75' size={14} />
                                                <span className='text-[12px] font-bold'>{post.comments} {t.comments}</span>
                                            </div>
                                            <div className="text-[12px] font-bold text-[#B3936D] -mt-2.5">
                                                {post.date}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="mt-12 flex justify-center 0">
                            <Pagination
                                current={currentPage}
                                total={posts.length}
                                pageSize={pageSize}
                                onChange={(page) => setCurrentPage(page)}
                                showSizeChanger={false}
                            />
                        </div>
                    </div>
                    <div className="flex-1 lg:max-w-sm">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-[Rubik] mb-4 pb-2 relative inline-block">
                                    {t.search}
                                    <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-gray-900"></span>
                                </h3>
                                <div className="relative mt-6">
                                    <input
                                        type="text"
                                        placeholder={t.searchPlaceholder}
                                        className="w-full rounded-lg px-4 py-2 -mt-3 border border-gray-300 focus:outline-none focus:border-gray-900"
                                    />
                                    <Search className="absolute -mt-1 right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl pb-2 font-[Rubik] mb-4 relative inline-block">
                                    {t.categories}
                                    <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-gray-900"></span>
                                </h3>
                                <ul className="space-y-2 mt-0">
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <a href="#" className="text-gray-600 text-[14px] hover:text-gray-900 transition-colors">
                                                {category}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl pb-2 font-[Rubik] mb-4 relative inline-block">
                                    {t.archives}
                                    <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-gray-900"></span>
                                </h3>
                                <ul className="mt-3 space-y-3">
                                    {archives.map((archive) => (
                                        <li key={archive.name}>
                                            <a
                                                href="#"
                                                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                                            >
                                                <img
                                                    src={archive.image}
                                                    alt={archive.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-semibold">{archive.name}</span>
                                                    <span className="font-bold text-lg text-[#B3936D] text-center">${archive.price}</span>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogLayout;
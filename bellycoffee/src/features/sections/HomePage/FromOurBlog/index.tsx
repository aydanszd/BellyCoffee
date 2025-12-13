import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';

interface BlogPost {
    id: number;
    image: string;
    title: string;
    author: string;
    category: string;
    excerpt: string;
}
const blogTranslations = {
    en: {
        title: "From Our Blog",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        by: "By",
        in: "in",
        readMore: "Read More",
        posts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
                title: 'Sample post with format link',
                author: 'admin',
                category: 'furniture',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop',
                title: 'Post with Gallery',
                author: 'admin',
                category: 'business',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
                title: 'Sample post with format chat',
                author: 'admin',
                category: 'interior',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            }
        ]
    },
    ru: {
        title: "Из нашего блога",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        by: "Автор",
        in: "в",
        readMore: "Читать далее",
        posts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
                title: 'Пример поста с форматом ссылки',
                author: 'admin',
                category: 'мебель',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop',
                title: 'Пост с галереей',
                author: 'admin',
                category: 'бизнес',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
                title: 'Пример поста с форматом чата',
                author: 'admin',
                category: 'интерьер',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            }
        ]
    },
    az: {
        title: "Blogumuzdan",
        subtitle: "Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.",
        by: "Müəllif",
        in: "kateqoriya",
        readMore: "Ətraflı oxu",
        posts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
                title: 'Link formatında nümunə yazı',
                author: 'admin',
                category: 'mebel',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop',
                title: 'Qalereyalı yazı',
                author: 'admin',
                category: 'biznes',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
                title: 'Söhbət formatında nümunə yazı',
                author: 'admin',
                category: 'interyer',
                excerpt: 'Maecenas eget congue augue. Sed mollis tempor velit, et tempor justo cursus vel. Phasellus lacinia placerat lacus, vulputate...'
            }
        ]
    }
};

const BlogSection: React.FC = () => {
    const currentLang = useSelector(selectCurrentLanguage);
    const t = blogTranslations[currentLang];
    const blogPosts = t.posts;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-serif mb-4 text-gray-900">
                        {t.title}
                    </h2>
                    <div className="mt-8 flex justify-center">
                        <img src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/heading-title-icon.png" alt="" />
                    </div>
                    <p className="text-gray-400 italic text-sm mb-8">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="group">
                            <div className="relative overflow-hidden mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-center px-4">
                                <h3 className="text-2xl font-serif mb-4 text-gray-900 group-hover:text-amber-700 transition-colors cursor-pointer">
                                    {post.title}
                                </h3>

                                <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-5">
                                    <span className="italic">
                                        {t.by} <span className="text-amber-600">{post.author}</span>
                                    </span>
                                    <span className="italic">
                                        {t.in} <span className="text-gray-500">{post.category}</span>
                                    </span>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                                    {post.excerpt}
                                </p>

                                <button className="text-xs font-semibold tracking-widest uppercase text-gray-900 border border-gray-300 px-8 py-3 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300">
                                    {t.readMore}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
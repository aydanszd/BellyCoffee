import React from 'react';

interface BlogPost {
    id: number;
    image: string;
    title: string;
    author: string;
    category: string;
    excerpt: string;
}

const BlogSection: React.FC = () => {
    const blogPosts: BlogPost[] = [
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
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-serif mb-4 text-gray-900">
                        From Our Blog
                    </h2>
                    <div className="mt-8 flex justify-center">
                        <img src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/heading-title-icon.png" alt="" />
                    </div>
                    <p className="text-gray-400 italic text-sm mb-8">
                        Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="group">
                            {/* Image */}
                            <div className="relative overflow-hidden mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="text-center px-4">
                                <h3 className="text-2xl font-serif mb-4 text-gray-900 group-hover:text-amber-700 transition-colors cursor-pointer">
                                    {post.title}
                                </h3>

                                {/* Meta */}
                                <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-5">
                                    <span className="italic">
                                        By <span className="text-amber-600">{post.author}</span>
                                    </span>
                                    <span className="italic">
                                        in <span className="text-gray-500">{post.category}</span>
                                    </span>
                                </div>

                                {/* Excerpt */}
                                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                                    {post.excerpt}
                                </p>

                                {/* Read More Button */}
                                <button className="text-xs font-semibold tracking-widest uppercase text-gray-900 border border-gray-300 px-8 py-3 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300">
                                    Read More
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
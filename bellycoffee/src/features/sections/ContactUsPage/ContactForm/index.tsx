import { useState } from 'react';
import { Home, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    }

    return (
        <div className="min-h-screen mt-[-130px]">
            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-16">
                    <div className="md:col-span-2">
                        <h1 className="text-5xl font-[Rubik] text-gray-800 mb-16">Contact Us</h1>
                        <div className="mb-10 pb-8 border-b border-gray-200 -mt-5">
                            <div className="flex items-start gap-6">
                                <div className="bg-gray-100 p-4 rounded">
                                    <Home className="w-7 h-7 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Address</h3>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                123 Main Street, Anytown, CA 12345 – USA
                            </p>
                        </div>
                        <div className="mb-10 pb-8 border-b border-gray-200">
                            <div className="flex items-start gap-6">
                                <div className="bg-gray-100 p-4 rounded">
                                    <Phone className="w-7 h-7 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Phone</h3>
                                </div>
                            </div>
                            <div className="text-gray-600 space-y-1 mt-4">
                                <p>Mobile: (08) 123 456 789</p>
                                <p>Hotline: 1009 678 456</p>
                            </div>
                        </div>
                        <div className="mb-10">
                            <div className="flex items-start gap-6">
                                <div className="bg-gray-100 p-4 rounded">
                                    <Mail className="w-7 h-7 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Email</h3>
                                </div>
                            </div>
                            <div className="text-gray-600 space-y-1 mt-4">
                                <p>yourmail@domain.com</p>
                                <p>support@domain.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5">
                        <h2 className="text-5xl font-[Rubik] text-gray-800 mb-12">Tell Us Your Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-gray-500 text-sm mb-3">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-3">
                                    Your Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-3">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-3">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-6 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="px-10 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
                            >
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

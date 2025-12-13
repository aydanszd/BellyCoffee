import { useState } from 'react';
import { Home, Phone, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';
const contactFormTranslations = {
    en: {
        title: "Contact Us",
        address: "Address",
        addressText: "123 Main Street, Anytown, CA 12345 – USA",
        phone: "Phone",
        mobile: "Mobile: (08) 123 456 789",
        hotline: "Hotline: 1009 678 456",
        email: "Email",
        formTitle: "Tell Us Your Message",
        yourName: "Your Name",
        yourEmail: "Your Email",
        subject: "Subject",
        yourMessage: "Your Message",
        send: "SEND",
        required: "*",
        successMessage: "Message sent successfully!",
        emailPlaceholder1: "yourmail@domain.com",
        emailPlaceholder2: "support@domain.com"
    },
    ru: {
        title: "Связаться с нами",
        address: "Адрес",
        addressText: "123 Main Street, Anytown, CA 12345 – USA",
        phone: "Телефон",
        mobile: "Мобильный: (08) 123 456 789",
        hotline: "Горячая линия: 1009 678 456",
        email: "Эл. почта",
        formTitle: "Напишите нам сообщение",
        yourName: "Ваше имя",
        yourEmail: "Ваш email",
        subject: "Тема",
        yourMessage: "Ваше сообщение",
        send: "ОТПРАВИТЬ",
        required: "*",
        successMessage: "Сообщение успешно отправлено!",
        emailPlaceholder1: "yourmail@domain.com",
        emailPlaceholder2: "support@domain.com"
    },
    az: {
        title: "Bizimlə əlaqə",
        address: "Ünvan",
        addressText: "123 Main Street, Anytown, CA 12345 – USA",
        phone: "Telefon",
        mobile: "Mobil: (08) 123 456 789",
        hotline: "Qaynar xətt: 1009 678 456",
        email: "Email",
        formTitle: "Bizə mesajınızı yazın",
        yourName: "Adınız",
        yourEmail: "Email ünvanınız",
        subject: "Mövzu",
        yourMessage: "Mesajınız",
        send: "GÖNDƏR",
        required: "*",
        successMessage: "Mesaj uğurla göndərildi!",
        emailPlaceholder1: "yourmail@domain.com",
        emailPlaceholder2: "support@domain.com"
    }
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const currentLang = useSelector(selectCurrentLanguage);
    const t = contactFormTranslations[currentLang];

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert(t.successMessage);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen -mt-32.5">
            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-16">
                    <div className="md:col-span-2">
                        <h1 className="text-5xl font-[Rubik] text-gray-800 mb-16">{t.title}</h1>
                        <div className="mb-10 pb-8 border-b border-gray-200 -mt-5">
                            <div className="flex items-start gap-6">
                                <div className="bg-gray-100 p-4 rounded">
                                    <Home className="w-7 h-7 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">{t.address}</h3>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                {t.addressText}
                            </p>
                        </div>
                        <div className="mb-10 pb-8 border-b border-gray-200">
                            <div className="flex items-start gap-6">
                                <div className="bg-gray-100 p-4 rounded">
                                    <Phone className="w-7 h-7 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">{t.phone}</h3>
                                </div>
                            </div>
                            <div className="text-gray-600 space-y-1 mt-4">
                                <p>{t.mobile}</p>
                                <p>{t.hotline}</p>
                            </div>
                        </div>
                        <div className="mb-10">
                            <div className="flex items-start gap-6">
                                <div className="bg-gray-100 p-4 rounded">
                                    <Mail className="w-7 h-7 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">{t.email}</h3>
                                </div>
                            </div>
                            <div className="text-gray-600 space-y-1 mt-4">
                                <p>{t.emailPlaceholder1}</p>
                                <p>{t.emailPlaceholder2}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5">
                        <h2 className="text-5xl font-[Rubik] text-gray-800 mb-12">{t.formTitle}</h2>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-gray-500 text-sm mb-3">
                                    {t.yourName} <span className="text-red-500">{t.required}</span>
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
                                    {t.yourEmail} <span className="text-red-500">{t.required}</span>
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
                                <label className="block text-gray-500 text-sm mb-3">{t.subject}</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-3">{t.yourMessage}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-6 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="px-10 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
                            >
                                {t.send}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
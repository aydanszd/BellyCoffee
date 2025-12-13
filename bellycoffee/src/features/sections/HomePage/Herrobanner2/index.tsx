import { ChevronUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../../../Redux/Slices/languageSlice';

const heroTranslations = {
    en: {
        subtitle: "MAKING PEOPLE HAPPY",
        title: "Love & Coffee",
        sale: "Sale 20%",
        description: "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.",
        button: "DISCOVER NOW"
    },
    ru: {
        subtitle: "ДЕЛАЕМ ЛЮДЕЙ СЧАСТЛИВЫМИ",
        title: "Любовь и Кофе",
        sale: "Скидка 20%",
        description: "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.",
        button: "УЗНАТЬ БОЛЬШЕ"
    },
    az: {
        subtitle: "İNSANLARI XOŞBƏXTLƏŞDİRİRİK",
        title: "Sevgi və Qəhvə",
        sale: "20% Endirim",
        description: "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.",
        button: "İNDİ KƏŞF ET"
    }
};

export default function HeroBanner2() {
    const currentLang = useSelector(selectCurrentLanguage);
    const t = heroTranslations[currentLang];

    return (
        <div className="">
            <div
                className="relative min-h-175 flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://t3.ftcdn.net/jpg/10/81/38/84/360_F_1081388459_HUXngohu1hArzVofGMQ3SDro1Upq2ul9.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="text-center px-4 max-w-4xl">
                    <div className="mb-6">
                        <p className="text-white text-sm tracking-[0.3em] uppercase mb-4">
                            {t.subtitle}
                        </p>
                        <div className="flex justify-center mb-6">
                            <div className="border-t-2 border-white w-32"></div>
                        </div>
                    </div>

                    <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
                        {t.title}<br />{t.sale}
                    </h1>

                    <p className="text-gray-300 opacity-60 text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                        {t.description}
                    </p>

                    <button className="bg-[#b3936d] hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded transition-colors uppercase tracking-wider">
                        {t.button}
                    </button>
                </div>
                <button
                    className="absolute bottom-8 right-8 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
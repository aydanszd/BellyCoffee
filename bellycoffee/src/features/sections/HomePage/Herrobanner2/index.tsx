import { ChevronUp } from 'lucide-react';

export default function HeroBanner2() {
    return (
        <div className="">
            <div
                className="relative min-h-[700px] flex items-center justify-center"
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
                            MAKING PEOPLE HAPPY
                        </p>
                        <div className="flex justify-center mb-6">
                            <div className="border-t-2 border-white w-32"></div>
                        </div>
                    </div>

                    <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
                        Love & Coffee<br />Sale 20%
                    </h1>

                    <p className="text-gray-300 opacity-60 text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                        Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.
                    </p>

                    <button className="bg-[#b3936d] hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded transition-colors uppercase tracking-wider">
                        DISCOVER NOW
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
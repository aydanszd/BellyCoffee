
const BellyWelcomeSection = () => {
    return (
        <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[#B3936D] font-normal text-3xl mb-4 tracking-wide">
                            Welcome to Belly
                        </p>
                        <h1 className="text-5xl md:text-5xl font-normal text-gray-900 mb-8">
                            Who Are The Best
                        </h1>
                        <p className="text-gray-500 text-[16px] max-w-4xl mx-auto leading-relaxed">
                            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,
                            vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
                            qui blandit praesent luptatum zzril delenit augue duis dolore te feugait.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <img
                            src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/banner1.jpg"
                            alt="Coffee splash"
                            className="max-w-2xl w-full h-auto object-contain"
                        />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default BellyWelcomeSection;
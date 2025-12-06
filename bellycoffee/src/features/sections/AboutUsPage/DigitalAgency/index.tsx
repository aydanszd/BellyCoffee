import React from 'react';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-37">
                <h1 className="text-5xl md:text-5xl font-[Rubik] text-center mb-4">
                    About Us
                </h1>
                <div className="text-center text-gray-500 mb-12">
                    <span className="hover:text-gray-700 cursor-pointer font-normal">Home</span>
                    <span className="mx-2">/</span>
                    <span className='text-[#B3936B]  font-normal'>About Us</span>
                </div>
                <div className="mb-16">
                    <img
                        src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-banner1.jpg"
                        alt="Modern office building"
                        className="w-full h-[550px] object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-relaxed">
                        We are a digital agency focused on delivering content and utility user-experiences.
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-12 text-[14px]">
                        Adipiscing lacus ut elementum, nec duis, tempor litora turpis dapibus. Imperdiet cursus odio tortor in elementum. Egestas nunc eleifend feugiat lectus laoreet, vel nunc taciti integer eras. Hac pede dis, praesent nibh ac dui mauris sit. Pellentesque mi, facilisi mauris, elit sociis leo sodales accumsan, iaculis ac fringilla torquent lorem consectetur, sociosqu phasellus risus urna aliquam, ornare.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://demo-22.woovinapro.com/wp-content/uploads/2019/10/about-us-signature.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
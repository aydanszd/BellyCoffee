
export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Contact Us */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-gray-900 mb-4 mt-[70px] font-[Rubik]">Contact Us</h1>
          <p className="text-gray-600 text-[16px]">Home / <span className='text-[#B3936D]'> Contact Us</span></p>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-120 -mt-5 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540779576067!2d-0.13128368422953137!3d51.50735417963532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2s!4v1649847289654!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

     
    </div>
  );
}
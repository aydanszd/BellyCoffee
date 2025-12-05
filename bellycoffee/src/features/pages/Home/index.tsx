import CoffeeSlider from '../../sections/HomePage/HerroBanner/index'
import BellyWelcomeSection from '../../sections/HomePage/WelcomeToBelly'
import HeroBanner2 from '../../sections/HomePage/Herrobanner2'
import FeaturedProducts from '../../sections/HomePage/FeatureProduct'
import NewArrivals from '../../sections/HomePage/Newarrival'
import TestimonialSection from '../../sections/HomePage/ClientsSay'
import FromOurBlog from '../../sections/HomePage/FromOurBlog'
const HomePage = () => {
    return (
        <>
            <CoffeeSlider />
            <BellyWelcomeSection />
            <FeaturedProducts />
            <HeroBanner2 />
            <NewArrivals />
            <TestimonialSection />
            <FromOurBlog />
        </>
    )
}

export default HomePage

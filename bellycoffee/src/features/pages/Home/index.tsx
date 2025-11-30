import CoffeeSlider from '../../sections/HerroBanner/index'
import BellyWelcomeSection from '../../sections/WelcomeToBelly'
import HeroBanner2 from '../../sections/Herrobanner2'
import FeaturedProducts from '../../sections/FeatureProduct'
import NewArrivals from '../../sections/Newarrival'

const HomePage = () => {
    return (
        <>
            <CoffeeSlider />
            <BellyWelcomeSection />
            <FeaturedProducts />
            <HeroBanner2 />
            <NewArrivals />
        </>
    )
}

export default HomePage

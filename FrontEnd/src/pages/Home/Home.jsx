import styles from './Home.module.css';
import homePageBackgroundImage from '../../assets/pexels-manuel-barros-1263073-2403017.jpg';

import Hero from '../../components/shared/static/Hero/Hero.jsx';
import Branches from '../../components/Home/sections/Branches/Branches.jsx';
import Features from '../../components/Home/sections/Features/Features.jsx';
import Delight from '../../components/Home/sections/Delight/Delight.jsx';
import FeedBacks from '../../components/Home/sections/FeedBacks/FeedBacks.jsx';
import Footer from '../../components/shared/Footer/Footer';

function Home() {
  return (
    <div className={styles.container}>
      <Hero
        backgroundImage={homePageBackgroundImage}
        heading="Where Every Moment Feels Like Home"
        subHeading="Experience comfort and luxury at our hotel, where every stay is unforgettable. From elegant rooms to world-class amenities, your perfect gateway awaits"
        hasButtons={true}
      />
      <Branches />
      <Features />
      <Delight />
      <FeedBacks />
      <Footer />
    </div>
  );
}

export default Home;

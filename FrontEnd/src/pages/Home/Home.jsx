import styles from './Home.module.css';
import backgroundImageH from '../../assets/pexels-manuel-barros-1263073-2403017.jpg';

import HeroWrapper from '../../components/shared/HeroWrapper/HeroWrapper.jsx';
import Hero from '../../components/Home/sections/Hero/Hero.jsx';
import NavBar from '../../components/shared/NavBar/NavBar.jsx';
import Branches from '../../components/Home/sections/Branches/Branches.jsx';
import Features from '../../components/Home/sections/Features/Features.jsx';
import Delight from '../../components/Home/sections/Delight/Delight.jsx';
import FeedBacks from '../../components/Home/sections/FeedBacks/FeedBacks.jsx';

import Landing from '../../layouts/LandingPageLayout/Landing-page.layout.jsx';

function Home() {
  return (
    <div>
      <HeroWrapper backgroundImage={backgroundImageH}>
        <NavBar />
        <Hero />
      </HeroWrapper>
      <Branches />
      <Features />
      <Delight />
      <FeedBacks />
    </div>
  );
}

export default Home;

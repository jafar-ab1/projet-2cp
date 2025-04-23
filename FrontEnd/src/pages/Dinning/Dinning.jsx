import { useQuery } from '../../hooks';

import styles from './Dinning.module.css';
import backgroundImage from '../../assets/pexels-pixabay-262978.jpg';

import Hero from '../../components/shared/static/Hero/Hero';
import Footer from '../../components/shared/Footer/Footer';
import Spots from '../../components/Dinning/Spots/Spots';

import { dinningList } from '../../constants';

import DinningSpot from '../DinningSpot/DinningSpot';
import NotFound from '../NotFound/NotFound';

export default function Dinning() {
  const query = useQuery();
  const kind = query.get('spot');

  const spot = dinningList.find((spot) => spot.name == kind);

  if (spot) {
    return <DinningSpot spot={spot} />;
  }

  if (spot !== undefined) {
    return <NotFound />;
  }

  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={backgroundImage}
        hasButtons={false}
        heading="Savor culinary delights crafted for your ultimate satisfaction."
        subHeading="Wherever your journey takes you, our dining experiences combine flavor, ambiance, and exceptional service, making every meal unforgettable"
      />
      <Spots />
      <Footer />
    </div>
  );
}

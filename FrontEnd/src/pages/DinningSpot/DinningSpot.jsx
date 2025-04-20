import styles from './DinningSpot.module.css';

import Hero from '../../components/shared/static/Hero/Hero';
import Spot from '../../components/DinningSpot/Spot/Spot';
import Footer from '../../components/shared/Footer/Footer';

// interface ISpot {
//     hero: {
//       backgroundImage: any;
//       heading: string;
//       'sub-heading': string;
//     },
//     name: string;
//     image: any;
//     time: string;
//     description: string;
// }

// interface DinningSpotProps {
//      spot: ISpot;
// }

export default function DinningSpot({
  spot: { hero, title, name, images, time, description },
}) {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={hero.backgroundImage}
        hasButtons={false}
        heading={hero.heading}
        subHeading={hero['sub-heading']}
      />
      <Spot
        title={title}
        time={time}
        images={images}
        description={description}
      />
      <Footer />
    </div>
  );
}

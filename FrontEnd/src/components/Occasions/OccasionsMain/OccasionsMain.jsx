import styles from './OccasionsMain.module.css';

import OccasionImage from '../../../assets/pexels-fakhribagirov-13659421.jpg';

import Description from '../../shared/static/Description/Description';
import Carousel from '../../shared/static/Carousel/Carousel';

export default function OccasionsMain() {
  return (
    <div className={styles.container}>
      <Description text="Our hotel is the perfect venue for your special occasions, whether it’s a wedding or a birthday celebration. We offer elegant spaces, tailored services, and a refined atmosphere to create unforgettable memories. From stunning decor to personalized menus, every detail is designed to make your event truly exceptional" />
      <div className={styles['inner-container']}>
        <Carousel
          image={OccasionImage}
          links={[{ text: 'Make a reservation', to: '/book' }]}
          text="occasions"
        />
      </div>
    </div>
  );
}

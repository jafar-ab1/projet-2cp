import styles from './Spots.module.css';
import { spots } from '../../../constants';

import Description from '../../shared/static/Description/Description';
import Carousel from '../../shared/static/Carousel/Carousel';

export default function Spots() {
  return (
    <div className={styles.container}>
      <Description text="Delight in a variety of dining options crafted for every palate. Whether for a casual meal or a fine dining experience, we offer the perfect setting for any occasion. Flavorful, elegant, and inviting, your ideal dining moment awaits." />
      <div className={styles['inner-container']}>
        {spots.map(({ image, text, links }) => (
          <Carousel image={image} text={text} links={links} />
        ))}
      </div>
    </div>
  );
}

import image from '../../../../../assets/pexels-pixabay-271639.jpg';
import FlexContainer from '../../../../shared/static/basic/FlexContainer/FlexContainer';
import Image from '../../../../shared/static/basic/Image/Image';
import styles from './Hotels.module.css';

import { Link } from 'react-router-dom';

export default function Hotels() {
  return (
    <FlexContainer className={styles.container}>
      <div>
        <div className={styles['left-side']}>
          <p className={styles.title}>Find Your Perfect Stay</p>
          <ul className={styles['hotels-list']}>
            <li>
              <p>The Hotel In Algiers</p>
            </li>
            <li>
              <p>The Hotel In Oran</p>
            </li>
            <li>
              <p>The Hotel In Annaba</p>
            </li>
          </ul>
          <Link className={styles.link}>Accommodation</Link>
        </div>
        <Image reverse image={image} />
      </div>
    </FlexContainer>
  );
}

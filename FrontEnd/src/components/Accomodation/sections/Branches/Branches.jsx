import styles from './Branches.module.css';

import { accomodationBranches } from '../../../../constants';

import Description from '../../../../components/shared/static/Description/Description';
import Carousel from '../../../shared/static/Carousel/Carousel';

export default function Branches() {
  return (
    <div className={styles.container}>
      <Description text="Enjoy a range of rooms designed for comfort and relaxation. Whether for business or leisure, we offer the perfect space for your stay. Cozy, stylish, and welcoming, your ideal room awaits." />
      <div className={styles['inner-container']}>
        {accomodationBranches.map(({ image, text, links }) => (
          <Carousel image={image} text={text} links={links} />
        ))}
      </div>
    </div>
  );
}

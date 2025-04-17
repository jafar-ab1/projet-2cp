import styles from './Branches.module.css';

import algiersImage from '../../../../assets/pexels-karlsolano-2883048.jpg';
import oranImage from '../../../../assets/pexels-quark-studio-1159039-2507010.jpg';
import annabaImage from '../../../../assets/pexels-pixabay-53577 (1).jpg';

import Description from '../../../../components/shared/static/Description/Description';
import Branch from './Branch/Branch';

export default function Branches() {
  return (
    <div className={styles.container}>
      <Description text="Enjoy a range of rooms designed for comfort and relaxation. Whether for business or leisure, we offer the perfect space for your stay. Cozy, stylish, and welcoming, your ideal room awaits." />
      <div className={styles['inner-container']}>
        <Branch image={algiersImage} location="Algiers" />
        <Branch image={oranImage} location="Oran" />
        <Branch image={annabaImage} location="Annaba" />
      </div>
    </div>
  );
}

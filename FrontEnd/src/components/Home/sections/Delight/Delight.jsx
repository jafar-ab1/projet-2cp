import image from '../../../../assets/pexels-mat-brown-150387-1395967.jpg';
import styles from './Delight.module.css';

import { Link } from 'react-router-dom';

import FlexContainer from '../../../shared/static/basic/FlexContainer/FlexContainer';
import Image from '../../../shared/static/basic/Image/Image';

export default function Delight() {
  return (
    <FlexContainer reverse className={styles.container}>
      <div>
        <Image image={image} />
        <div className={styles['right-side']}>
          <p className={styles.title}>Delight in Every Bite</p>
          <ul className={styles['gourmet-list']}>
            <li>
              <p>The Gourmet Spot</p>
            </li>
            <li>
              <p>The Gourmet Plate</p>
            </li>
            <li>
              <p>The Coffe Nook</p>
            </li>
          </ul>
          <Link className={styles.link} to="/Dinning">
            Dinning
          </Link>
        </div>
      </div>
    </FlexContainer>
  );
}

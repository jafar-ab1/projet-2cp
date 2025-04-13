import image from '../../../../assets/pexels-mat-brown-150387-1395967.jpg';

import styles from './Delight.module.css';

import { Link } from 'react-router-dom';

export default function Delight() {
  return (
    <section className={styles.container}>
      <div>
        <div className={styles['left-side']}>
          <img src={image} />
        </div>
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
          <button className={styles.link}>
            <Link to="/Dinning">Dinning</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

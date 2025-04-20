import { Link } from 'react-router-dom';
import Description from '../../../components/shared/static/Description/Description';
import styles from './Spot.module.css';

export default function Spot({ images, title, time, description }) {
  return (
    <div className={styles.container}>
      <Description text={null} />
      <div className={styles['inner-container']}>
        {images.map((image) => (
          <div className={styles['image-container']}>
            <div
              className={styles['image-inner-container']}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </div>
        ))}
        <div className={styles['info-container']}>
          <p className={styles.title}>{title}</p>
          <p className={styles.strong}>reservation highly recommended</p>
          <p className={styles.normal}>{time}</p>
          <p className={styles.normal}>{description}</p>
          <button>
            <Link to="/book">Make a reservation</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

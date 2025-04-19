import styles from './Room.module.css';
import { Link } from 'react-router-dom';

export default function Room({ city, room }) {
  return (
    <div className={styles.container}>
      <div className={styles['inner-container']}>
        <div className={styles['image-container']}>
          <div
            style={{
              backgroundImage: `url(${room.image})`,
            }}
          ></div>
        </div>
        <div className={styles['info-container']}>
          <p className={styles.city}>{city} hotel </p>
          <p className={styles['room-type']}>{room.type} room</p>
          <div className={styles.details}>
            <p>
              <strong>Price:</strong> Starting at ${room.price} per night
            </p>
            <p>
              <strong>Space:</strong> {room.space} m<sup>2</sup>
            </p>
            <p>
              <strong>Description:</strong> {room.description}
            </p>
            {room.recommendation && (
              <p className={styles.recommendation}>{room.recommendation}</p>
            )}
          </div>
          <button type="button">
            <Link to="/book">book now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

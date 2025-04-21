import styles from './Room.module.css';

import { Link } from 'react-router-dom';

import FlexContainer from '../../../shared/static/basic/FlexContainer/FlexContainer';
import Image from '../../../shared/static/basic/Image/Image';

export default function Room({ city, room, reverse }) {
  return (
    <div className={styles.container}>
      <FlexContainer reverse={reverse} className={styles['inner-container']}>
        <Image image={room.image} reverse={reverse} />
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
            <Link to="/book">book now</Link>
        </div>
      </FlexContainer>
    </div>
  );
}

import styles from './Rooms.module.css';
import Description from '../../../components/shared/static/Description/Description';
import Room from './Room/Room';

export default function Rooms({ city, description, rooms }) {
  return (
    <div className={styles.container}>
      <Description text={description.text} />
      <div className={styles['inner-container']}>
        {rooms.map((room, index) => (
          <Room city={city} room={room} reverse={(index % 2) == 0} />
        ))}
      </div>
    </div>
  );
}

import Room from '../Room/Room';
import styles from './Rooms.module.css';

// interface RoomsProps {
//     rooms: IRoom[]
// }

export default function Rooms({ rooms }) {
  return (
    <div className={styles.container}>
      {rooms.map((room) => (
        <Room room={room} />
      ))}
    </div>
  );
}

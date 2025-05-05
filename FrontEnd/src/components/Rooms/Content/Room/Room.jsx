import styles from './Room.module.css';
import someoneImage from '../../../../../public/images/someone.png';

// interface IRoom {
//     id: string;
//     image_url: string;
//     capacity: number;
//     details: { item: string; count: number }[]
//     area: number;
//     bed_type: string;
//     bed_count: number;
//     description: string;
//     price: string;
//     capacity: number
// };

// interface RoomProps {
//     room: IRoom;
// }

export default function Room({ room }) {
  return (
    <div className={styles.container}>
      <div className={styles['upper-container']}>
        <div className={styles['image-container']}>
          <img src={room.image_url} alt="room picture" />
        </div>
        <div className={styles.info}>
          <p className={styles['bed-type']}>
            <p>{room.bed_count}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <p>{room.bed_type}</p>
          </p>
          <div className={styles['someone-image-container']}>
            {Array.from({ length: room.capacity }).map((_) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#494444"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            ))}
          </div>
          <div>
            {room.area} m<sup>2</sup>
          </div>
        </div>
      </div>
      <div className={styles['bottom-container']}>
        <p>Dzd {room.price}</p>
        <p>Per Night</p>
        <p>Excluding taxes and fees</p>
      </div>
    </div>
  );
}

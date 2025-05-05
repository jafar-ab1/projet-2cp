import roomsData from '../../../data/room';

import styles from './Content.module.css';
import InputSection from './InputSection/InputSection';
import Rooms from './Rooms/Rooms';

export default function Content() {
  return (
    <main className={styles.container}>
      <InputSection />
      <Rooms rooms={roomsData} />
    </main>
  );
}

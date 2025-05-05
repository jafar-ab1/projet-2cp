import Content from '../../components/Rooms/Content/Content';
import Header from '../../components/Rooms/Header/Header';
import styles from './Rooms.module.css';

export default function RoomsPage() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
    </div>
  );
}

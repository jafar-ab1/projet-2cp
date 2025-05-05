import { useEffect, useState } from 'react';
import cn from '../../../../utils/cn';
import styles from './GuestPicker.module.css';
import NumberPicker from './NumberPicker/NumberPicker';

// interface Counter {
//     count: number;
//     set: (count: number) => void;
// }

// interface GuestPickerProps {
//     adultsCounter: Counter;
//     childrenCounter: Counter
// }

export default function GuestPicker({ adultsCounter, childrenCounter }) {
  const [isClicked, setIsClicked] = useState(false);
  const toggle = () => setIsClicked((prev) => !prev);

  return (
    <div className={styles.container} onClick={toggle}>
      <p className={cn(styles.title, isClicked ? styles.onClick : '')}>Guest</p>
      <p className={cn(styles.status, isClicked ? styles.onClick : '')}>
        {adultsCounter.count} Adults, {childrenCounter.count} Children
      </p>
      <div className={cn(styles.form, isClicked ? styles.open : '')}>
        <div className={styles.picker}>
          <p>Adults</p>
          <NumberPicker
            count={adultsCounter.count}
            setCounter={adultsCounter.set}
          />
        </div>
        <div className={styles.picker}>
          <p>Children</p>
          <NumberPicker
            count={childrenCounter.count}
            setCounter={childrenCounter.set}
          />
        </div>
      </div>
    </div>
  );
}

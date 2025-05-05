import { useState } from 'react';

import styles from './InputSection.module.css';
import DatePicker from '../DatePicker/DatePicker';
import GuestPicker from '../GuestPicker/GuestPicker';

export default function InputSection() {
  const [state, setState] = useState({
    'check-in': '02-03-2025',
    'check-out': '02-03-2025',
    guests: {
      adults: 0,
      children: 0,
    },
  });

  const setAdultsCounter = (value) =>
    setState((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        adults: value,
      },
    }));

  const setChildrenCounter = (value) =>
    setState((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        children: value,
      },
    }));

  return (
    <div className={styles['input-container']}>
      <div className={styles['input-inner-container']}>
        <DatePicker label="Check-in" />
        <DatePicker label="Check-out" />
        <GuestPicker
          adultsCounter={{
            count: state.guests.adults,
            set: setAdultsCounter,
          }}
          childrenCounter={{
            count: state.guests.children,
            set: setChildrenCounter,
          }}
        />
      </div>
    </div>
  );
}

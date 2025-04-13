import styles from './FeedBacks.module.css';

import image from '../../../../assets/pexels-reneterp-2504911.jpg';
import { useState } from 'react';

function Circle() {
  return <div className={styles.circle}></div>;
}

export default function FeedBacks() {
  const [circles, setCircles] = useState(
    (() => {
      const a = [];
      for (let i = 0; i < 4; ++i) {
        a.push(i);
      }
      return a;
    })()
  );

  return (
    <section className={styles.container}>
      <div className={styles['inner-container']}>
        <div
          className={styles['feedback-container']}
          style={{ backgroundImage: `url(${image})` }}
        >
          <p className={styles.feedback}>
            "Had an amazing stay! The rooms were clean and <br />
            cozy, and the staff was super friendly. <br />
            Would love to come back again!"
          </p>
        </div>
        <div className={styles['progress']}>
          {circles.map((_) => (
            <Circle />
          ))}
        </div>
      </div>
    </section>
  );
}

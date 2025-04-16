import styles from './Branches.module.css';

import Hotels from './Hotels/Hotels';
import Description from '../../../shared/static/Description/Description';

export default function Branches() {
  return (
    <section className={styles.container}>
      <Description text="Welcome to our booking platform, where comfort meets convenience. Discover stays from cozy retreats to luxurious escapes. Whether for business, romance, or family, book your stay today!" />
      <Hotels />
    </section>
  );
}

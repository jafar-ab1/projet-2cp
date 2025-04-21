import styles from './WellnessThings.module.css';
import { wellnessList } from '../../../constants';

import Description from '../../shared/static/Description/Description';
import WellnessThing from './WellnessThing/WellnessThing';

export default function WellnessThings() {
  return (
    <div className={styles.container}>
      <Description text="Our hotel is the ideal destination for wellness, offering a serene and luxurious atmosphere to help you relax and recharge. From rejuvenating spa treatments to holistic retreats, we provide everything needed to nourish your mind and body." />
      <div className={styles['inner-container']}>
        {wellnessList.map(({ image, title, description }, index) => (
          <WellnessThing
            image={image}
            title={title}
            description={description}
            reverse={index % 2 == 1}
          />
        ))}
      </div>
    </div>
  );
}

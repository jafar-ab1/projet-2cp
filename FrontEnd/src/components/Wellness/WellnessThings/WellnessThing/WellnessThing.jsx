import { Link } from 'react-router-dom';
import styles from './WellnessThing.module.css';

import FlexContainer from '../../../shared/static/basic/FlexContainer/FlexContainer';

// interface WellnessThingProps {
//    image: any;
//    title: string;
//    description: string;
//    reverse: boolean;
//}

export default function WellnessThing({ image, title, description, reverse }) {
  return (
    <FlexContainer reverse={reverse} className={styles.container}>
      <div className={styles['image-container']}>
        <div
          className={styles['image-inner-container']}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className={styles['inner-container']}>
        <div className={styles['info-container']}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Link to="/book">Make a reservation</Link>
      </div>
    </FlexContainer>
  );
}

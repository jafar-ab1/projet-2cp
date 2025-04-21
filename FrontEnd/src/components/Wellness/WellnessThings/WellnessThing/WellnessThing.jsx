import { Link } from 'react-router-dom';
import styles from './WellnessThing.module.css';

import FlexContainer from '../../../shared/static/basic/FlexContainer/FlexContainer';
import Image from '../../../shared/static/basic/Image/Image';

// interface WellnessThingProps {
//    image: any;
//    title: string;
//    description: string;
//    reverse: boolean;
//}

export default function WellnessThing({ image, title, description, reverse }) {
  return (
    <FlexContainer reverse={reverse} className={styles.container}>
      <Image image={image} reverse={reverse} />

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

import styles from './Branch.module.css';

import Hero from '../shared/static/Hero/Hero';
import Rooms from './Rooms/Rooms';
import Footer from '../../components/shared/Footer/Footer';

// interface IBranch {
//     city: string;
//     hero: {
//         "background-image": string;
//         heading: string;
//         "sub-heading": string;
//     }
//     description: {
//         text: string
//     };
//     rooms: [
//         {
//             type: string;
//             image: any;
//             price: number;
//             space: number;
//             description: string;
//             recommendation: string | null;
//         }
//     ]
// }

// interface BranchProps {
//     branch: IBranch;
// }

export default function Branch({ branch: { city, hero, description, rooms } }) {
  return (
    <div className={styles.page}>
      <Hero
        backgroundImage={hero['background-image']}
        hasButtons={false}
        heading={hero.heading}
        subHeading={hero['sub-heading']}
      />
      <Rooms rooms={rooms} city={city} description={description} />
      <Footer />
    </div>
  );
}

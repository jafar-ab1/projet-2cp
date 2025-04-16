import styles from "./Description.module.css"
import MainLogo from '../MainLogo/MainLogo';

// interface DescriptionProps {
//    text: string;
// }

export default function Description({ text }) {
  return (
    <div className={styles.container}>
      <MainLogo isfooter={false} />
      <p className={styles.par3}>{text}</p>
    </div>
  );
}

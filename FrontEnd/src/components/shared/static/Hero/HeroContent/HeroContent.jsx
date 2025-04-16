import styles from "./HeroContent.module.css"

import { Link } from 'react-router-dom';

// interface HeroContentProps {
//     heading: string;
//     subHeading: string;
//     hasButtons: boolean;
// }

export default function HeroContent({ heading, subHeading, hasButtons }) {
  return (
    <div className={styles.container}>
      <div className={styles.par}>
        <p className={styles.par1}>{heading}</p>
        <p className={styles.par2}>{subHeading}</p>
      </div>
      <div className={styles.buttons}>
        {hasButtons && (
          <>
            <button className={styles.booking}>
              <Link to="/Book">Book now</Link>
            </button>
            <button className={styles.more}>
              <p>Learn more</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

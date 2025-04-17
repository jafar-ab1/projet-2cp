import { Link } from 'react-router-dom';
import styles from './Branch.module.css';

// interface BranchProps {
//     image: string;
//     location: string;
// }

function NavigationDiv() {
  return (
    <div className={styles['buttons-container']}>
      <button type="button">
        <Link to="/book">
          book now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </button>
      <button type="button">
        <Link to="/">
          learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </button>
    </div>
  );
}

export default function Branch({ image, location }) {
  return (
    <div className={styles['outer-container']}>
      <div className={styles.container}>
        <div
          className={styles['inner-container']}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div>
            <p>{location} branch</p>
          </div>
        </div>
        <NavigationDiv />
      </div>
    </div>
  );
}

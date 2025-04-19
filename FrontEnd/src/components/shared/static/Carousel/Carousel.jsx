import { Link } from 'react-router-dom';

import styles from './Carousel.module.css';

// interface CarouselProps {
//     image: string;
//     text: string;
//     links: ({ text: string; to: string; })[];
// }

function Arrow() {
  return (
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
  );
}

function NavigationDiv({ links }) {
  return (
    <div className={styles['buttons-container']}>
      {links.map((link) => (
        <button type="button">
          <Link to={link.to}>
            {link.text} <Arrow />
          </Link>
        </button>
      ))}
    </div>
  );
}

export default function Carousel({ image, text, links }) {
  return (
    <div className={styles['outer-container']}>
      <div className={styles.container}>
        <div
          className={styles['inner-container']}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div>
            <p>{text}</p>
          </div>
        </div>
        <NavigationDiv links={links} />
      </div>
    </div>
  );
}

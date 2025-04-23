import { useEffect, useState } from 'react';
import styles from './HeroWrapper.module.css';

// interface HeroWrapperProps {
//     backgroundImage: string;
//     children: React.ReactNode;
// }

export default function HeroWrapper({ backgroundImage, children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setLoaded(true);
  }, [backgroundImage]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container}`}
        style={{
          backgroundImage: loaded ? `url(${backgroundImage})` : 'none',
          opacity: loaded ? 1 : 0,
        }}
      >
        
      </div>
      <div>{children}</div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './MenuLink.module.css';
import { useState } from 'react';

// interface MenuLink {
//     name: string;
//     to: string;
//     subLinks: ({ name: string; to: string })[]
// }

const LinksContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const LinkContainerVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.1,
  },
};

export default function MenuLink({ name, to, subLinks }) {
  const [isHidden, setIsHidden] = useState(true);
  const toggle = () => setIsHidden((prev) => !prev);
  return (
    <motion.div className={styles.link} variants={LinkContainerVariant}>
      <div className={`${subLinks.length == 0 ? styles.pad : ''}`}>
        {subLinks.length !== 0 && (
          <button type="button" onClick={toggle}>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        )}
        <Link to={to}>{name}</Link>
      </div>
      {!isHidden && (
        <motion.ul variants={LinksContainerVariants}>
          {subLinks.map((link) => (
            <motion.li variants={LinkContainerVariant}>
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>

              <Link to={link.to}>{link.name}</Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}

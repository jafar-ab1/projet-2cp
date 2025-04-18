import { motion } from 'framer-motion';
import MenuLink from './MenuLink/MenuLink';
import styles from './Menu.module.css';
import { menuLinks } from '../../../../../constants';

// interface MenuProps {
//    isOpened: boolean;
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

export default function Menu({ isOpened }) {
  return (
    <div className={`${styles.menu} ${isOpened ? styles.open : styles.close}`}>
      <motion.ul
        className={styles.links}
        variants={LinksContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuLinks.map(({ name, to, subLinks }) => (
          <MenuLink name={name} to={to} subLinks={subLinks} />
        ))}
      </motion.ul>
    </div>
  );
}

import { useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/auth/useAuth';
import MenuButton from './MenuButton/MenuButton';
import Links from './Links/Links';
import LeftIcon from './LeftIcon/LeftIcon';
import Menu from './Menu/Menu';

export default function NavBar() {
  const {
    accessToken,
    actions: { logout },
  } = useAuth();

  const [isOpened, setIsOpened] = useState(false);
  const toggle = () => setIsOpened((prev) => !prev);

  useEffect(() => {
    console.log(isOpened);
  }, [isOpened]);

  return (
    <div className={styles.navbar}>
     <h1><Link to="/"><LeftIcon /></Link></h1> 
      <Links />
      <div className={styles['right-section']}>
        {accessToken ? (
          <button className={styles['sign-in']} onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/auth/sign-in">
            <button className={styles['sign-in']}>Sign In</button>
          </Link>
        )}
      </div>
      <MenuButton isOpened={isOpened} toggle={toggle} />
      <Menu isOpened={isOpened} />
    </div>
  );
}

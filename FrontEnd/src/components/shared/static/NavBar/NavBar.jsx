import styles from "./NavBar.module.css"
import { Link } from "react-router-dom"
import useAuth from "../../../../hooks/auth/useAuth";

export default function NavBar() {
    const { accessToken, actions: {logout}}=useAuth();
    return(
        <div className={styles.navbar}>
            <div className={styles["left-section"]}>
                <p>HOTEL<br />NAME</p>
            </div>
            <ul className={styles["middle-section"]}>
                <li><Link to="/accomodation">Accommodation</Link></li>
                <li><Link to="/occasions">Occasions</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/wellness">Wellness</Link></li>
                <li><Link to="/dining">Dining</Link></li>
            </ul>
            <div className={styles["right-section"]}>
                {accessToken ? (
                <button className={styles["sign-in"]} onClick ={logout}>logout</button>
                ):(
                    <Link to ="/sign-in">
                        <button className={styles["sign-in"]}>Sign In</button>
                    </Link>
                )}
            </div>
            <button className={styles.button}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.burger}>
                    <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="white"/>
                </svg>
            </button>
      </div>
    )
}
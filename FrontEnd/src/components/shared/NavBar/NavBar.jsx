import styles from "./NavBar.module.css"

import { Link } from "react-router-dom"


export default function NavBar() {
    return(
        <div className={styles.navbar}>
            <div className={styles["left-section"]}>
                <p>HOTEL<br />NAME</p>
            </div>
            <ul className={styles["middle-section"]}>
                <li><Link to="/Accommodation">Accommodation</Link></li>
                <li><Link to="/Occasions">Occasions</Link></li>
                <li><Link to="/Events">Events</Link></li>
                <li><Link to="/Wellness">Wellness</Link></li>
                <li><Link to="/Dining">Dining</Link></li>
            </ul>
            <div className={styles["right-section"]}>
                <button className={styles["sign-in"]}>Sign In</button>
            </div>
            <button className={styles.button}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.burger}>
                    <path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="white"/>
                </svg>
            </button>
      </div>
    )
}
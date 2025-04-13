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
      </div>
    )
}
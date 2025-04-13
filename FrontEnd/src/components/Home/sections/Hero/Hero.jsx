import styles from "./Hero.module.css"

import { Link } from "react-router-dom"

export default function Hero() {
    return(
        <>
            <div className={styles.par}>
                <p className={styles.par1}>Where Every Moment<br />Feels Like Home</p>
                <p className={styles.par2}>Experience comfort and luxury at our hotel, where every stay is<br /> unforgettable. From elegant rooms to world-class amenities, your perfect<br /> geteway awaits.</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.booking}>
                    <Link to="/booking">
                        Book now
                    </Link>
                </button>
                <button className={styles.more}>Learn more &gt;</button>
            </div>
        </>
    )
}
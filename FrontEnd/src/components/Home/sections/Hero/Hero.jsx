import styles from "./Hero.module.css"

import { Link } from "react-router-dom"

export default function Hero() {
    return(
        <div className={styles.container}>
            <div className={styles.par}>
                <p className={styles.par1}>Where Every Moment Feels Like Home</p>
                <p className={styles.par2}>Experience comfort and luxury at our hotel, where every stay is unforgettable. From elegant rooms to world-class amenities, your perfect gateway awaits.</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.booking}>
                    <Link to="/Book">
                        Book now
                    </Link>
                </button>
                <button className={styles.more}>
                    <p>Learn more</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
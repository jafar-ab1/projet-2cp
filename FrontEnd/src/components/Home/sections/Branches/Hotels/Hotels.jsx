import image from "../../../../../assets/pexels-pixabay-271639.jpg"
import styles from "./Hotels.module.css"

import { Link } from "react-router-dom"

export default function Hotels() {
    return(
        <div className={styles.container}>
            <div>
                <div className={styles["left-side"]}>
                    <p className={styles.title}>Find Your Perfect Stay</p>
                    <ul className={styles["hotels-list"]}>
                        <li><p>The Hotel In Algiers</p></li>
                        <li><p>The Hotel In Oran</p></li>
                        <li><p>The Hotel In Annaba</p></li>
                    </ul> 
                    <button className={styles.link} >
                        <Link>Accommodation</Link>
                    </button>
                </div>
                <div className={styles["right-side"]}>
                    <div className={styles["right-side-image"]}>
                        <img src={image} />
                    </div>
                </div>
            </div>
        </div>
    )
}
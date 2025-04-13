import image from "../../../../assets/pexels-pixabay-271639.jpg"

import { Link } from "react-router-dom"
import styles from "./Branches.module.css"

import Welcome from "./Welcome/Welcome"

export default function Branches() {
    return(
        <section className={styles.container}>
            <Welcome />
            <div className={styles["inner-container"]}>
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
        </section>
    )
}
import image from "../../../../../assets/9em7.png"
import styles from "./Welcome.module.css"

export default function Welcome() {
    return(
        <div className={styles.container}>
            <div className={styles["image-container"]}>
                <img src={image} />
            </div>
            <p className={styles.par3}>
                Welcome to our booking platform, where comfort meets <br/> convenience. Discover stays from cozy retreats to luxurious <br/>escapes. Whether for business, romance, or family, <br/>book your stay today!
            </p>
        </div>
    )
}
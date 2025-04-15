import image from "../../../../../assets/9em7.png"
import MainLogo from "../../../../shared/MainLogo/MainLogo"
import styles from "./Welcome.module.css"

export default function Welcome() {
    return(
        <div className={styles.container}>
            <MainLogo isfooter={false} />
            <p className={styles.par3}>
                Welcome to our booking platform, where comfort meets  convenience. Discover stays from cozy retreats to luxurious escapes. Whether for business, romance, or family, book your stay today!
            </p>
        </div>
    )
}
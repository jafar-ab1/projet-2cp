import styles from "./Welcome.module.css"

export default function Welcome() {
    return(
        <div className={styles.head}>
            <p className={styles.par3}>
                Welcome to our booking platform, where comfort meets <br/> convenience. Discover stays from cozy retreats to luxurious <br/>escapes. Whether for business, romance, or family, <br/>book your stay today!
            </p>
        </div>
    )
}
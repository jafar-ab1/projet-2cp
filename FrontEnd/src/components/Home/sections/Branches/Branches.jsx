
import styles from "./Branches.module.css"

import Welcome from "./Welcome/Welcome"
import Hotels from "./Hotels/Hotels"

export default function Branches() {
    return(
        <section className={styles.container}>
            <Welcome />
            <Hotels />
        </section>
    )
}
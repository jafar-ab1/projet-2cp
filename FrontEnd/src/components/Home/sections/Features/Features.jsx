import styles from "./Features.module.css"

import occasionsImage from '../../../../assets/pexels-alfred-binne-bin-646217215-27138849.jpg'
import eventsImage from '../../../../assets/pexels-mark-angelo-sampan-738078-1587927.jpg'
import wellnessImage from '../../../../assets/pexels-gabby-k-6781117.jpg'

import Feature from "./Feature/Feature"

export default function Features() {
    return(
        <section className={styles.container}>
            <div className={styles["features-container"]}>
                <Feature
                    title="occasions"
                    image={occasionsImage}
                    link="/Occasions"
                />
                <Feature
                    title="events"
                    image={eventsImage}
                    link="/Events"
                />
                <Feature
                    title="wellness"
                    image={wellnessImage}
                    link="/Wellness"
                />
            </div>
      </section>
    )
}
import image from "../../../assets/9am7_akhor.png"
import image2 from "../../../assets/9em7.png"

import styles from "./MainLogo.module.css"

// interface MainLogo {
//     isfooter: boolean;
// }

export default function MainLogo({ isfooter }) {
    const img = isfooter ? image : image2;
    return(
        <div
            className={styles.container}
        >
            <img 
                src={img}
                alt="main logo"
            />
        </div>
    )
}
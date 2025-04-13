import { Link } from "react-router-dom"
import styles from "./Feature.module.css"

// interface FeatureProps {
//     title: string;
//     image: string;
//     link: string;
// }

export default function Feature({
    title,
    image,
    link
}) {
    return(
        <div className={styles.feature} 
            style={{
                backgroundImage: `url(${image})`
            }}
        >
            <p>{title}</p>
            <button>
                <Link to={link}>
                    Learn More
                </Link>
            </button>
        </div>
    )
}
import styles from "./HeroWrapper.module.css"

// interface HeroWrapperProps {
//     backgroundImage: string;
//     children: React.ReactNode;
// }

export default function HeroWrapper({
    backgroundImage,
    children
}) {
    return(
        <div 
            className={styles.wrapper}
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        >
            { children }
        </div>
    )
}
import styles from "./FormHeader.module.css"

// interface FormHeaderProps {
//     text: string;
// }

export default function FormHeader({ text }) {
    return(
        <div className={styles.header}>
            <h1>{ text }</h1>
        </div>
    )
}
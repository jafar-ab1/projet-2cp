import styles from "./Button.module.css"

// interface ButtonProps {
//     onClick: () => Promise<void>;
//     text: string;
// }

export default function Button({ text, onClick: handleClick }) {
    return(
        <button type="button" onClick={handleClick} className={styles.button}>
            { text }
        </button>
    )
}
import cn from "../../../utils/cn"
import styles from "./Form.module.css"

// interface FormProps {
//     children: React.ReactNode;
// }

export default function Form({ children }) {
    return(
        <div className={styles.outerContainer}>
            <form 
                className={styles.container} 
            >
                { children }
            </form>
        </div>
    )
}
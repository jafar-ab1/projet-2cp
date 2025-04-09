import styles from "./FormFieldsContainer.module.css"

// interface FormFieldsContainerProps {
//     children: React.ReactNode;
// }

export default function FormFieldsContainer({ children }) {
    return(
        <div className={styles.container}>
            { children }
        </div>
    )
}
import styles from "./CheckBox-Input.module.css"

// interface CheckBoxInputProps {
//     isChecked: boolean;
//     toggle: () => void;
//     text : string;
// }

export default function CheckBoxInput({ isChecked, toggle, text }) {
    return(
        <label className={styles.label}>
            <input onChange={toggle} type="checkbox" checked={isChecked} />
            <p>{ text }</p>
        </label>
    )
}
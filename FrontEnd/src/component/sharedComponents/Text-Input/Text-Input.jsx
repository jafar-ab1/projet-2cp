import React, { useState } from "react"

import styles from "./Text-Input.module.css"
import cn from "../../../utils/cn";

// interface TextInputProps {
//     canBeHidden: boolean;
//     name: string;
//     placeholder: string;
//     sideIcon: JSX.Element;
//     value: string;
//     setValue: (value: string) => void;
// }

export default function TextInput({
    canBeHidden,
    name, 
    placeholder, 
    sideIcon, 
    value,
    setValue, 
}) {
    const [isHidden, setIsHidden] = useState(canBeHidden ? true : false);
    const toggle = () => setIsHidden((prev) => !prev);

    const handleChange = (e) => {
        const { value } = e.target;
        return setValue(value);
    };

    const handleClick = () => {
        if(!canBeHidden) return;
        return toggle();
    }

    return(
        <div className={styles.container}>
            <input 
                type={isHidden ? "password" : "text"}
                name={name} 
                placeholder={placeholder}
                onChange={handleChange}
                className={styles.input}
                value={value}
            />
            {
                sideIcon !== null
                &&
                <button
                    type="button"
                    onClick={handleClick}
                    className={styles.button}
                >
                    {
                        React.cloneElement(
                            sideIcon, 
                            { className: styles.sideIcon }
                        )
                    }
                </button>
            }
            </div>
    )
}
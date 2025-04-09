import styles from "./Sign-page.layout.module.css"

import { Outlet } from "react-router-dom"


export default function SignPageLayout() {
    return(
        <div className={styles.container}>
            <Outlet />
        </div>
    )
}
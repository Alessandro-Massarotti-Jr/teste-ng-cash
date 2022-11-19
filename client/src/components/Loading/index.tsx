import styles from "./styles.module.css"

import { Icon } from "@iconify/react";

export default function Loading() {

    return (
        <div className={styles.loading}>
            <div className={styles.loading__icon}>
                <Icon icon="icon-park-outline:loading-one" />
            </div>
        </div>
    );
}
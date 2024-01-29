import styles from './Loader.module.css';
import { LoaderProps } from './Loader.props';



export function Loader({className}: LoaderProps){
    return (
        <div className={`${styles.container} ${styles[`${className}`]}`}>
            <div className={styles.loading}></div>
        </div>
    )
}
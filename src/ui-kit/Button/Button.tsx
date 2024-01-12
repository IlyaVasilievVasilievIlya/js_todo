import { ButtonProps } from "./Button.props"
import styles from './Button.module.css'


export const Button = ({type, className, onClick, children}: ButtonProps) => {
    return (
        <button type={type} className={styles[className]} onClick={onClick}>
            {children}
        </button>
    )
}
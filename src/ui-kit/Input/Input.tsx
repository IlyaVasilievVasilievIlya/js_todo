import { InputProps } from "./Input.props"
import styles from './Input.module.css'
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    name, label, required, type, placeholder, errorMessage, onChange}, ref) => {

    return (
        <div className="container"> 
            <label className={`${styles.label} ${required ? styles.required : ''}`}>
                {label}{required && <span>*</span>}
            </label>
            <input ref={ref} 
                name={name}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className={`${styles.input} ${errorMessage ? styles.errorField: ''}`}/> 
            <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
    )
})

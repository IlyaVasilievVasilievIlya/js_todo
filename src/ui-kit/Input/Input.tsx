import { InputProps } from "./Input.props"
import styles from './Input.module.css'
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    name, label, isRequired, type, placeholder, errorMessage, onChange}, ref) => {

    return (
        <div> 
            <label className={`${styles.label} ${isRequired ? styles.required : ''}`}>
                {label}{isRequired && <span>*</span>}
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

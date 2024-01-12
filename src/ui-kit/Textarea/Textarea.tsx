import { forwardRef } from "react"
import { TextareaProps } from "./Textarea.props"
import styles from "./Textarea.module.css"

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(({
    name, isRequired, label, placeholder, errorMessage, onChange}, ref) => {

    return (
        <div> 
            <label className={`${styles.label} ${isRequired ? styles.required : ''}`}>
                {label}{isRequired && <span>*</span>}
            </label>
            <input ref={ref} 
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={`${styles.textarea} ${errorMessage ? styles.errorField: ''}`}/> 
            <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
    )
})
import { forwardRef } from "react"
import { TextareaProps } from "./Textarea.props"
import styles from "./Textarea.module.css"

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    name, isRequired, label, placeholder, errorMessage, onChange}, ref) => {

    return (
        <div className="container"> 
            <label className={`${styles.label} ${isRequired ? styles.required : ''}`}>
                {label}{isRequired && <span>*</span>}
            </label>
            <textarea ref={ref} 
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={`${styles.textarea} ${errorMessage ? styles.errorField: ''}`}/> 
            <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
    )
})
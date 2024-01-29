import { SelectProps } from "./Select.props"
import styles from './Select.module.css'
import { forwardRef, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";

export const Select: React.FC<SelectProps> =  ({value, onChange, label, required, options, errorMessage, placeholder, clearable}: SelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
          const { target } = event;
          if (target instanceof Node && !rootRef.current?.contains(target)) {
            setIsOpen(false);
          }
        };
      
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        }

      }, [isOpen]);

      
    const toggle = () => setIsOpen(!isOpen);


    const onOptionClicked = (value: number) => {
        setSelectedOption(value);
        setIsOpen(false);
        onChange(value);
    }

    return (
        <div className={styles.container} ref={rootRef}> 
            <label className={`${styles.label} ${required ? styles.required : ''}`}>
                {label}{required && <span>*</span>}
            </label>
            <div className={`${styles.control} ${errorMessage ? styles.errorField: ''}`} onClick = {toggle}>       
                <span className={`${styles[selectedOption ? '' :'placeholder']}`}>{options.find(option => option.value == value)?.label ?? placeholder}</span>
                {clearable && selectedOption != 0 && <Button className="closeBtnSmall" onClick={(e) => {e.stopPropagation(); onOptionClicked(0)}} type="button"/>}
                <Button className={`dropDownArrow${isOpen? '-opened': ''}`} />
            </div>
            {isOpen && 
                <ul className={styles.menu}>
                    {options.map(option => (
                        <li className={`${styles.li} ${styles[option.value == selectedOption ? 'selected':'']}`} onClick={() => onOptionClicked(option.value)} key={option.value}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            }
            <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
    )
}
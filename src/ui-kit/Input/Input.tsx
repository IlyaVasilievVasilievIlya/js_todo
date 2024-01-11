import { FieldValues } from "react-hook-form";
import { InputProps } from "./Input.props"

export const Input = <T extends FieldValues>( {label, placeholder, name, required, type, maxLength, register, errors}: InputProps<T>) => {
    
    const isRequired: boolean | string = required ? `Поле должно быть обязательным` : false;
    
    return (
        <div> 
            <label className="label__required">
                {label}{required && <span>*</span>}
            </label>
            <input {...register(name, {required: isRequired, 
                                        maxLength: {value: maxLength, message: `Поле не должно содержать более ${maxLength} символов`}})} 
                    type={type}
                    placeholder={placeholder}
                    className={`input ${errors[name]?.message ? ' error__field' : ''}`} > 
            </input>
            <span className="modal__content__errorMsg">{errors[name]?.message?.toString()}</span>
        </div>
    )
}
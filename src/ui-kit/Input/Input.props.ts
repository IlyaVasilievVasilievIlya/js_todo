import { UseFormRegister, FieldValues, FieldErrors, UseControllerProps } from 'react-hook-form'

export interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
    label: string
    placeholder: string
    required: boolean
    type: string
    maxLength: number
    register: UseFormRegister<T>
    errors: FieldErrors<T>
}
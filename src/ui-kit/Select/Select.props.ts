import { IOption } from "../../components/model"

export interface SelectProps {
    label: string
    onChange: (selected: number) => void
    value: number
    required: boolean
    errorMessage?: string | undefined
    options: IOption[]
    placeholder: string
    clearable: boolean
}
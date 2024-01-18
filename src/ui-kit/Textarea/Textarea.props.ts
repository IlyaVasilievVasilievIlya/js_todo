import { DetailedHTMLProps, TextareaHTMLAttributes } from "react"

export interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    label: string
    errorMessage: string | undefined
}

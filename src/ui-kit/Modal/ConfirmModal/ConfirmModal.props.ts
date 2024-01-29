import { ReactNode } from "react";

export interface ConfirmModalProps{
    children: React.ReactNode
    error?: string;
    isOpened: boolean
    title: string
    submitText: string | ReactNode
    onSubmit: () => void
    cancelText: string
    onClose: () => void
}
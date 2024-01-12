export interface ConfirmModalProps{
    children: React.ReactNode
    isOpened: boolean
    title: string
    submitText: string
    onSubmit: () => void
    cancelText: string
    onClose: () => void
}
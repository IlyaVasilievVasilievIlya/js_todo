interface OverlayingModalProps{
    children: React.ReactNode
    onClose: (event: React.FormEvent) => void
    isOpened: boolean
}
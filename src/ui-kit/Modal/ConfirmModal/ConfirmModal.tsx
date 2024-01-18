import { OverlayingModal } from '../OverlayingModal/OverlayingModal'
import styles from './ConfirmModal.module.css'
import { Button } from '../../Button/Button'
import { ConfirmModalProps } from './ConfirmModal.props'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import { ModalActions } from '../ModalActions/ModalActions'
import { ModalContainer } from '../ModalContainer/ModalContainer'

export function ConfirmModal({ children, isOpened, title, submitText, cancelText, onSubmit, onClose }: ConfirmModalProps) {
    return (
        <OverlayingModal isOpened={isOpened} onClose={onClose}>
            <ModalContainer>
                <ModalHeader title={title} onClose={onClose} />
                <div className={styles.content}>
                    {children}
                </div>
                <ModalActions>
                    <Button type="submit" className="primaryBtn" onClick={onSubmit}>{submitText}</Button>
                    <Button type="button" className="secondaryBtn" onClick={onClose}>{cancelText}</Button>
                </ModalActions>
            </ModalContainer>
        </OverlayingModal>
    )
}
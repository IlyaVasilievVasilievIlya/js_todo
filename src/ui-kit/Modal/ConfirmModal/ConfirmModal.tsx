import { Button } from '../../Button/Button'
import { ConfirmModalProps } from './ConfirmModal.props'
import { ModalHeader } from '../ModalHeader/ModalHeader'
import { ModalActions } from '../ModalActions/ModalActions'
import { ModalContainer } from '../ModalContainer/ModalContainer'
import { OverlayingModal } from '../OverlayingModal/OverlayingModal'

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ children, error, isOpened, title, submitText, cancelText, onSubmit, onClose }: ConfirmModalProps) => {
    return (
        <OverlayingModal isOpened={isOpened} onClose={onClose}>
            <ModalContainer>
                <ModalHeader title={title} onClose={onClose} />
                <div>
                    {children}
                </div>
                <ModalActions errorMessage={error}>
                    <Button type="submit" className="primaryBtn" onClick={onSubmit}>{submitText}</Button>
                    <Button type="button" className="secondaryBtn" onClick={onClose}>{cancelText}</Button>
                </ModalActions>
            </ModalContainer>
        </OverlayingModal>
    )
}
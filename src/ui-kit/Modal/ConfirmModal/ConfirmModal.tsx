import { OverlayingModal } from '../OverlayingModal/OverlayingModal'
import styles from './ConfirmModal.module.css'
import { Button } from '../../Button/Button'
import { ConfirmModalProps } from './ConfirmModal.props'

export function ConfirmModal({children, isOpened, title, submitText, cancelText, onSubmit, onClose}: ConfirmModalProps){
    
    console.log("*");
    return (
        <OverlayingModal isOpened={isOpened} onClose={onClose}>
            <div className={styles.container}>
                <h1>{title}</h1>
                <Button className="closeBtn" type="reset" onClick={onClose}/>              
                <div className={styles.content}>
                    { children }
                </div>   
                <Button type="submit" className="primaryBtn" onClick={onSubmit}>{submitText}</Button>
                <Button type="button" className="secondaryBtn" onClick={onClose}>{cancelText}</Button>
            </div>
        </OverlayingModal>
    )
}
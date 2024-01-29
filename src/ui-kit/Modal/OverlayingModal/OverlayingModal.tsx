import styles from './OverlayingModal.module.css'
import { OverlayingModalProps } from './OverlayingModal.props';

export function OverlayingModal({children, onClose, isOpened}: OverlayingModalProps){

    if (!isOpened) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div 
                className={styles.overlay}
                role="button"
                tabIndex={0}
                onClick={onClose}
            /> 
            {children}
        </div>
    )
}
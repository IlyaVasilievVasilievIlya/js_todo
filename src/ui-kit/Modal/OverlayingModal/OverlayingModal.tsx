import React from 'react'
import styles from './OverlayingModal.module.css'




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
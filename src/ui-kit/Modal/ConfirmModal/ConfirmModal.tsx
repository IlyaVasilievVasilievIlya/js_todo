import React from 'react'
import { OverlayingModal } from '../OverlayingModal/OverlayingModal'
import styles from './ConfirmModal.module.css'
import { Button } from '../../Button/Button'



export function ConfirmModal({children, isOpened, title, submitText, cancelText, onSubmit, onClose}: ConfirmModalProps){
    return (
        <OverlayingModal isOpened={isOpened} onClose={onClose}>
            <div className={styles.containter}>
                <h1>{title}</h1>
                <Button className="close-btn" type="reset" text="&times;" onClick={onClose}/>              
                <div className={styles.content}>
                    { children }
                </div>   
                <Button type="submit" className="primary-btn" text={submitText} onClick={onSubmit}/>
                <Button type="button" className="secondary-btn" text={cancelText} onClick={onClose}/>
            </div>
        </OverlayingModal>
    )
}
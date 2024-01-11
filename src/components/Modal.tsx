import React from 'react'

interface ModalProps{
    children: React.ReactNode
    title: string
    submitText: string
    cancelText: string
    onSubmit: (event: React.FormEvent) => void
    onCancel: (event: React.FormEvent) => void
}


export function Modal({children, title, submitText, cancelText, onSubmit, onCancel}: ModalProps){
    return (
        <form onSubmit={onSubmit}>
            <div className="modal__background" onClick={onCancel}>
                <div className="modal__foreground" onClick={e => e.stopPropagation()}>
                    <h1>{title}</h1>
                    <button className="modal__closeBtn" type="button" onClick={onCancel}>&times;</button>
                     <div className="modal__inner">
                        { children }
                    </div>   
                    <button type="submit" className="primaryBtn">{submitText}</button>
                    <button type="button" className="secondaryBtn" onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        </form>    
    )
}
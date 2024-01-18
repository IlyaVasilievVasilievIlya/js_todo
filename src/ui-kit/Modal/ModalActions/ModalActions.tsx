import styles from './ModalActions.module.css'
import { ModalActionsProps } from './ModalActions.props'

export function ModalActions({children}: ModalActionsProps){
    return (
        <div className={styles.container}>       
            {children}
        </div>
    )
}
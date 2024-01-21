import { ErrorMessage } from '../../../components/ErrorMessage'
import styles from './ModalActions.module.css'
import { ModalActionsProps } from './ModalActions.props'

export function ModalActions({children, errorMessage}: ModalActionsProps){
    return (
        <div className={styles.container}>  
            <ErrorMessage error={errorMessage}/>     
            {children}
        </div>
    )
}
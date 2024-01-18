import styles from './ModalContainer.module.css'
import { ModalContainerProps } from './ModalContainer.props'


export function ModalContainer({children}: ModalContainerProps){
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
import { Button } from "../../Button/Button"
import { ModalHeaderProps } from "./ModalHeader.props"
import styles from './ModalHeader.module.css'


export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }: ModalHeaderProps) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>{title}</h1>
            <Button className="closeBtn" type="reset" onClick={onClose} />
        </div>
    )
}
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ children, header, onClose }) => {
    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles.header}>{header}</div>
                <div className={styles.close} onClick={onClose}>
                    <CloseIcon type="primary" />
                </div>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        document.getElementById('react-modals')
    );
};

export default Modal;

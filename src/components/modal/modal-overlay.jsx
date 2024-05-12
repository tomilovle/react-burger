import { useEffect } from 'react';
import styles from './modal.module.css';

const ModalOverlay = ({ onClose }) => {
    useEffect(() => {
        const escFunction = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, [onClose]);

    return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;

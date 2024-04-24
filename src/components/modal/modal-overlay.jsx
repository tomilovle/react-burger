import { useCallback, useEffect } from 'react';
import styles from './modal.module.css';

const ModalOverlay = ({ onClose }) => {
    const escFunction = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, [escFunction]);
    return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;

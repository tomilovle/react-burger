import { useEffect } from "react";
import styles from "./modal.module.css";
import { FC } from "react";

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [onClose]);

  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;

import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  header: string;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, header, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal} data-cy="ingredient-modal">
        <div className="text text_type_main-large">{header}</div>
        <div
          className={styles.close}
          onClick={onClose}
          data-cy="order-modal-close"
        >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("react-modals") as HTMLElement,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

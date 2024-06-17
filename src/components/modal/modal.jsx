import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ children, header, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className="text text_type_main-large">{header}</div>
        <div className={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("react-modals"),
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

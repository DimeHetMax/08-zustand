'use client';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';



interface ModalProp {
  children: React.ReactNode;
  onBackDropClose: () => void;
}
const Modal = ({ children, onBackDropClose }: ModalProp) => {
  const handleBackDrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onBackDropClose();
    }
  };
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") onBackDropClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onBackDropClose]);
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackDrop}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;

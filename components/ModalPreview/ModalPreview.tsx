'use client';

import { useEffect } from 'react';
import css from './ModalPreview.module.css';

type Props = {
  children: React.ReactNode;
  onBackDropClose: () => void;
};

const ModalPreview = ({ children, onBackDropClose }: Props) => {


  const handleBackDrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onBackDropClose()
    }
  };
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') onBackDropClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onBackDropClose]);
  return (
    <div className={css.backdrop} onClick={handleBackDrop}>
      <div className={css.modal}>
        <button onClick={onBackDropClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default ModalPreview;

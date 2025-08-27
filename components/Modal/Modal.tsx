'use client';

import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import css from "./Modal.module.css";

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose(); 
    } else {
      router.back(); 
    }
  }, [onClose, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.backdrop) handleClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      data-backdrop
      onClick={handleBackdrop}
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    document.body
  );
}

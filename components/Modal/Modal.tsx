'use client';

import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
   onClose: () => void;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBackdrop = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.backdrop) onClose();
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

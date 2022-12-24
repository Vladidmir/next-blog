import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  MouseEvent,
  MouseEventHandler,
} from "react";
import React from "react";

export interface IModalProps {
  visible?: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalContainer: FC<IModalProps> = ({ visible, children, onClose }) => {
  const containerId = useId();
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target && target.id === containerId) handleClose();
  };

  useEffect(() => {
    const closeModal = ({ key }: KeyboardEvent) => {
      key === "Escape" && handleClose();
    };

    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, [handleClose]);

  if (!visible) return null;
  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalContainer;

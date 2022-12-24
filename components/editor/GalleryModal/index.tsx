import { NextPage } from "next";
import { ChangeEvent, FC, useCallback } from "react";

import ModalContainer from "../../common/MadalContainer";
import { IModalProps } from "../../common/MadalContainer";

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface IGalleryModalProps extends IModalProps {}

const GalleryModal: FC<IGalleryModalProps> = ({
  onClose,
  visible,
}): JSX.Element => {
  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded"></div>
    </ModalContainer>
  );
};

export default GalleryModal;

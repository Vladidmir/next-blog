import { ChangeEventHandler, FC, useCallback, useState } from "react";
import Image from "next/image";

import { AiOutlineCloudUpload } from "react-icons/ai";

import ModalContainer from "../../common/MadalContainer";
import Gallery from "./Gallery";
import ActionButton from "../../common/ActionButton";

import { IModalProps } from "../../common/MadalContainer";
import { images } from "../editorUtils";

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface IGalleryModalProps extends IModalProps {
  onSelect(result: ImageSelectionResult): void;
  onFileSelect(image: File): void;
}

const GalleryModal: FC<IGalleryModalProps> = ({
  onClose,
  visible,
  onSelect,
  onFileSelect,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState("");
  const [altText, setAltText] = useState("");

  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleSelection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage, altText });
    handleClose();
  };

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith("image")) return handleClose();

    onFileSelect(file);
  };

  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar">
            <Gallery
              images={images}
              selectedImage={selectedImage}
              onSelect={(src) => setSelectedImage(src)}
            />
          </div>

          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input
                  onChange={handleOnImageChange}
                  hidden
                  type="file"
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <div className="w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded">
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>

              {selectedImage ? (
                <>
                  <textarea
                    className="resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-1"
                    placeholder="Alt text"
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>

                  <ActionButton onClick={handleSelection} title="Select" />

                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      src={selectedImage}
                      fill
                      className="object-contain"
                      alt={"Selected image"}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;

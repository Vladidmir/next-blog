import { FC } from "react";

import NextImage from "next/image";
import CheckMark from "../../common/CheckMark";

interface IImageProps {
  src: string;
  selected?: boolean;
  onClick: () => void;
}

const Image: FC<IImageProps> = ({ src, selected, onClick }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="relative rounded overflow-hidden cursor-pointer max-h-28"
    >
      <NextImage
        src={src}
        height={200}
        width={200}
        alt="gallery"
        className="bg-secondary-light hover:scale-110 transition object-cover"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;

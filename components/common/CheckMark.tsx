import { FC } from "react";
import { BsCheckLg } from "react-icons/bs";

interface ICheckMarkProps {
  visible: boolean;
}

const CheckMark: FC<ICheckMarkProps> = ({ visible }): JSX.Element | null => {
  if (!visible) return null;

  return (
    <div className="bg-action p-2 text-primary rounded-full bg-opacity-70 backdrop-blur-sm">
      <BsCheckLg />
    </div>
  );
};

export default CheckMark;

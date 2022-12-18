import { FC, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../Toolbar/Button";
import LinkForm, { IlinkOption } from "./LinkForm";

interface IInsertLinkProps {
  onSubmit(link: IlinkOption): void;
}

const InsertLink: FC<IInsertLinkProps> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (link: IlinkOption) => {
    if (!link.url.trim()) return hideForm();

    onSubmit(link);
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") hideForm();
      }}
      className="relative"
    >
      <Button onClick={visible ? hideForm : showForm}>
        <BsLink45Deg />
      </Button>

      <div className="absolute top-full mt-4 right-0 z-50">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;

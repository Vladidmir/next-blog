import { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import { validateUrl } from "../editorUtils";

interface ILinkFormProps {
  visible: boolean;
  onSubmit(link: IlinkOption): void;
  initialState?: IlinkOption;
}

export type IlinkOption = {
  url: string;
  openInNewTab: boolean;
};

const LinkForm: FC<ILinkFormProps> = ({
  visible,
  initialState,
  onSubmit,
}): JSX.Element | null => {
  const defaultLink = useRef({
    url: "",
    openInNewTab: false,
  });

  const [link, setLink] = useState<IlinkOption>(defaultLink.current);

  const handleSubmit = () => {
    onSubmit({ ...link, url: validateUrl(link.url) });
    resetForm();
  };

  const onChangeLink = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type === "checkbox") {
      setLink({ ...link, openInNewTab: e.target.checked });
    } else {
      setLink({ ...link, url: e.target.value });
    }
  };
  const resetForm = () => {
    setLink({ ...defaultLink.current });
  };

  useEffect(() => {
    if (initialState) setLink({ ...initialState });
  }, [initialState]);

  if (!visible) return null;

  return (
    <div className="rounded p-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark">
      <input
        autoFocus
        type="text"
        className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
        placeholder="https://example.com"
        value={link.url}
        onChange={onChangeLink}
      />

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={link.openInNewTab}
          onChange={onChangeLink}
        />
        <label htmlFor="open-in-new-tab">open in new tab</label>

        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="bg-action px-2 py-1 text-primary rounded text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;

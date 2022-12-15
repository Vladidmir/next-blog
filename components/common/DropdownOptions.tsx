import { FC, ReactNode, useState } from "react";

interface IDropdownOptionsProps {
  options: { label: string; onClick(): void }[];
  head: ReactNode;
}

const DropdownOptions: FC<IDropdownOptionsProps> = ({
  head,
  options,
}): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const onToggleOptions = () => {
    setShowOptions((showOptions) => !showOptions);
  };

  return (
    <button
      onBlur={onToggleOptions}
      onClick={onToggleOptions}
      onMouseDown={onToggleOptions}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-2 z-10 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => (
              <li key={label + index} onMouseDown={onClick}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;

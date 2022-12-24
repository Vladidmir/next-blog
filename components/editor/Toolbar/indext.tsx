import { NextPage } from "next";
import { Editor } from "@tiptap/core";

//lib-components
import { AiFillCaretDown } from "react-icons/ai";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
  BsLink45Deg,
  BsYoutube,
} from "react-icons/bs";

//my components
import DropdownOptions from "../../common/DropdownOptions";
import Button from "./Button";
import InsertLink from "../Link/InsertLink";
import GalleryModal from "../GalleryModal";

import { getFocusedEditor, getLebel } from "./editorUtils";
import { IlinkOption } from "../Link/LinkForm";
import EmbedYoutube from "./EmbedYoutube";

interface ToolBarProps {
  editor: Editor;
  onShowGalerry?: () => void;
}

const Tolbar: NextPage<ToolBarProps> = ({ editor, onShowGalerry }) => {
  const options = [
    {
      label: "Paragraf0",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Paragraf1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Paragraf2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Paragraf3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];

  const handleLinkSubmit = ({ url, openInNewTab }: IlinkOption) => {
    const { commands } = editor;
    if (openInNewTab) commands.setLink({ href: url, target: "_blank" });
    else commands.setLink({ href: url });
  };

  const handleEmbedYoutube = (url: string) => {
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  return (
    <div className="flex items-center">
      {/* paragraph, heading 1, 2, 3 */}
      <DropdownOptions options={options} head={<Head editor={editor} />} />

      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />

      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("bold")}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        >
          <BsTypeBold />
        </Button>

        <Button
          active={editor.isActive("italic")}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        >
          <BsTypeItalic />
        </Button>

        <Button
          active={editor.isActive("underline")}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        >
          <BsTypeUnderline />
        </Button>

        <Button
          active={editor.isActive("strike")}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        >
          <BsTypeStrikethrough />
        </Button>
      </div>

      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />

      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("blockquote")}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </Button>

        <Button
          active={editor.isActive("code")}
          onClick={() => getFocusedEditor(editor).toggleCode().run()}
        >
          <BsCode />
        </Button>

        <Button
          active={editor.isActive("codeBlock")}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        >
          <BsBraces />
        </Button>

        <InsertLink onSubmit={handleLinkSubmit} />

        <Button
          active={editor.isActive("orderedList")}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        >
          <BsListOl />
        </Button>

        <Button
          active={editor.isActive("bulletList")}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        >
          <BsListUl />
        </Button>
      </div>

      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8" />

      <div className="flex items-center space-x-3">
        <EmbedYoutube onSubmit={handleEmbedYoutube} />

        <Button onClick={onShowGalerry}>
          <BsImageFill />
        </Button>
      </div>
    </div>
  );
};

const Head = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center space-x-2 text-primary-dark dark:text-primary">
      <p>{getLebel(editor)}</p>
      <AiFillCaretDown size={14} />
    </div>
  );
};

export default Tolbar;

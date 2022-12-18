import { NextPage, GetStaticProps } from "next";
import { useEditor, EditorContent } from "@tiptap/react";
import Tolbar from "./Toolbar/indext";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

interface IEditorProps {}

const Editor: NextPage<IEditorProps> = ({}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Type something",
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  return (
    <div className="p-3 dark:bg-primary-dark bg-primary transition">
      {editor && <Tolbar editor={editor} />}
      <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />

      <EditorContent editor={editor} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Editor;

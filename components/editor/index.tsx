import { NextPage, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useEditor, EditorContent, getMarkRange, Range } from "@tiptap/react";

import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";

import Tolbar from "./Toolbar/indext";
import EditLink from "./Link/EditLink";
import GalleryModal, { ImageSelectionResult } from "./GalleryModal";
import UseEditor from "./useEditor";
interface IEditorProps {}

const Editor: NextPage<IEditorProps> = ({}) => {
  const [showGallery, setShowGallery] = useState(false);

  const { editor } = UseEditor();

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        {editor && (
          <Tolbar onShowGalerry={() => setShowGallery(true)} editor={editor} />
        )}
        {editor ? <EditLink editor={editor} /> : null}
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />

        <EditorContent editor={editor} />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        onFileSelect={() => {}}
      />
    </>
  );
};

export default Editor;

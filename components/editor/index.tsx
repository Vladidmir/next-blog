import { NextPage } from "next";
import { useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";

import Tolbar from "./Toolbar/indext";
import EditLink from "./Link/EditLink";
import GalleryModal from "./GalleryModal";
import UseEditor from "./useEditor";

import axios from "axios";

interface IEditorProps {}

const Editor: NextPage<IEditorProps> = ({}) => {
  const { editor, handleImageSelection } = UseEditor();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    const { data } = await axios("/api/image");
    setImages(data.images);
  };

  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post("/api/image", formData);
    setUploading(false);

    setImages([data, ...images]);
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;

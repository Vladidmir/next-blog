import { NextPage } from "next";
import { useEffect, useState, ChangeEventHandler } from "react";
import { EditorContent } from "@tiptap/react";

import Tolbar from "./Toolbar/indext";
import EditLink from "./Link/EditLink";
import GalleryModal from "./GalleryModal";
import UseEditor from "./useEditor";

import axios from "axios";
import SEOForm, { ISEOResult } from "./SeoForm";

interface IEditorProps {}

export interface FinalPost extends ISEOResult {
  title: string;
  content: string;
  thumbnail?: File | string;
}

const Editor: NextPage<IEditorProps> = ({}) => {
  const { editor, handleImageSelection } = UseEditor();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });

  const [seoInitialValue, setSeoInitialValue] = useState<ISEOResult>();
  const updateSeoValue = (result: ISEOResult) =>
    setPost({ ...post, ...result });

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setPost({ ...post, title: target.value });

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
          <>
            <input
              type="text"
              className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
              placeholder="Title"
              onChange={updateTitle}
              value={post.title}
            />
            <Tolbar
              onShowGalerry={() => setShowGallery(true)}
              editor={editor}
            />
          </>
        )}
        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        <SEOForm
          onChange={updateSeoValue}
          title={post.title}
          initialValue={seoInitialValue}
        />
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

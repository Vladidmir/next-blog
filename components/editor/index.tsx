import { NextPage } from "next";
import { useEffect, useState, ChangeEventHandler } from "react";
import { EditorContent } from "@tiptap/react";

import Toolbar from "./Toolbar/indext";
import EditLink from "./Link/EditLink";
import GalleryModal from "./GalleryModal";
import UseEditor from "./useEditor";

import axios from "axios";
import SEOForm, { ISEOResult } from "./SeoForm";
import ThumbnailSelector from "./ThumbnailSelector";
import ActionButton from "../common/ActionButton";

interface IEditorProps {
  initialValue?: IFinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: IFinalPost): void;
}

export interface IFinalPost extends ISEOResult {
  title: string;
  content: string;
  thumbnail?: File | string;
}

const Editor: NextPage<IEditorProps> = ({
  initialValue,
  btnTitle = "Submit",
  busy = false,
  onSubmit,
}) => {
  const { editor, handleImageSelection } = UseEditor();
  const [showGallery, setShowGallery] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState<IFinalPost>({
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

  const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });

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

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);

      const { meta, slug, tags } = initialValue;
      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        {editor && (
          <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
            <div className="flex items-center justify-between mb-3">
              <ThumbnailSelector
                initialValue={post.thumbnail as string}
                onChange={updateThumbnail}
              />
              <div className="inline-block">
                <ActionButton
                  busy={busy}
                  title={btnTitle}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            <input
              type="text"
              className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
              placeholder="Title"
              onChange={updateTitle}
              value={post.title}
            />
            <Toolbar
              onShowGalerry={() => setShowGallery(true)}
              editor={editor}
            />
            <EditLink editor={editor} />
            <EditorContent editor={editor} className="min-h-[300px]" />
            <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
            <SEOForm
              onChange={updateSeoValue}
              title={post.title}
              initialValue={seoInitialValue}
            />
          </div>
        )}
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

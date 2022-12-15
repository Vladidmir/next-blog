import { Editor } from "@tiptap/core";

export const getFocusedEditor = (editor: Editor) => {
  return editor.chain().focus();
};

export const getLebel = (editor: Editor): string => {
  if (editor.isActive("heading", { level: 1 })) return "Heading 1";
  if (editor.isActive("heading", { level: 2 })) return "Heading 2";
  if (editor.isActive("heading", { level: 3 })) return "Heading 3";
  return "Paragraph";
};

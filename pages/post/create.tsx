import { NextPage } from "next";
import Editor from "../../components/editor";

interface ICreateProps {}

const Create: NextPage<ICreateProps> = ({}) => {
  return (
    <div className="max-w-4xl m-auto">
      <Editor />
    </div>
  );
};

export default Create;

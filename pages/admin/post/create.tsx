import { NextPage } from "next";
import Editor from "../../../components/editor";
import AdminLayout from "../../../components/layout/AdminLayout";

interface ICreateProps {}

const Create: NextPage<ICreateProps> = ({}) => {
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl m-auto">
        <Editor
          onSubmit={(post) => {
            console.log(post);
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;

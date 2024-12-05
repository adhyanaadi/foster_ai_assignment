import React from "react";
import TemplateList from "../components/TemplateList";
import TemplateEditor from "../components/TemplateEditor";
import DragAndDropUploader from "../components/DragAndDropUploader";

const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-1 bg-white border rounded">
        <h2 className="p-4 text-xl font-bold border-b">Templates</h2>
        <TemplateList />
      </div>
      <div className="col-span-2 bg-white border rounded">
        <h2 className="p-4 text-xl font-bold border-b">Edit Template</h2>
        <TemplateEditor />
        <h2 className="p-4 mt-4 text-xl font-bold border-b">Upload File</h2>
        <DragAndDropUploader />
      </div>
    </div>
  );
};

export default Home;

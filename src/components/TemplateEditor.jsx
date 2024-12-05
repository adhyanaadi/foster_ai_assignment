import React from "react";

const TemplateEditor = () => {
  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Template Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Template Text"
        className="w-full p-2 border rounded"
        rows="6"
      />
      <button className="px-4 py-2 text-white bg-blue-500 rounded">Save</button>
    </div>
  );
};

export default TemplateEditor;

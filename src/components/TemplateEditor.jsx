import React, { useState } from "react";

const TemplateEditor = ({ template, onSave }) => {
  const [title, setTitle] = useState(template?.title || "");
  const [text, setText] = useState(template?.text || "");

  const handleSave = () => {
    onSave({ id: template?.id, title, text });
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Template Title"
        className="w-full p-2 text-black bg-gray-100 border rounded"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Template Text"
        className="w-full p-2 text-black bg-gray-100 border rounded"
        rows="6"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default TemplateEditor;

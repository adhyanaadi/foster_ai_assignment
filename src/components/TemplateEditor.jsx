import React, { useEffect, useState } from "react";

const TemplateEditor = ({ template, onSave }) => {
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setTitle(template?.title || "");
    setSections(template?.sections || []);
  }, [template]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      { order: sections.length + 1, title: `Section ${sections.length + 1}` },
    ]);
  };

  const handleUpdateSection = (index, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[index].title = newTitle;
    setSections(updatedSections);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = sections
      .filter((_, i) => i !== index)
      .map((section, i) => ({ ...section, order: i + 1 }));
    setSections(updatedSections);
  };

  const handleSave = () => {
    onSave({ id: template?.id, title, sections });
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
      <div className="space-y-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded"
          >
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleUpdateSection(index, e.target.value)}
              className="w-full p-1 mr-2 text-black bg-gray-100 border rounded"
            />
            <button
              onClick={() => handleDeleteSection(index)}
              className="px-2 py-1 text-white bg-red-500 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddSection}
        className="px-4 py-2 font-bold text-white bg-green-500 rounded"
      >
        Add Section
      </button>
      <button
        onClick={handleSave}
        className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded"
      >
        Save Template
      </button>
    </div>
  );
};

export default TemplateEditor;

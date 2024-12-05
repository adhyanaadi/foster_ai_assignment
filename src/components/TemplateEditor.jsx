import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTemplate } from "@/features/templateSlice";
import { v4 as uuidv4 } from "uuid";

const TemplateEditor = ({ template, onSave }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setTitle(template?.title || "");
    setSections(template?.sections || []);
  }, [template]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      { id: uuidv4(), title: `Section ${sections.length + 1}` },
    ]);
  };

  const handleUpdateSection = (id, newTitle) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
  };

  const handleDeleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  const handleSave = () => {
    const updatedTemplate = { id: template?.id, title, sections };
    dispatch(updateTemplate(updatedTemplate));
    onSave(updatedTemplate); // Notify parent if needed
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
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleUpdateSection(section.id, e.target.value)}
              className="w-full p-1 mr-2 text-black bg-gray-100 border rounded"
            />
            <button
              onClick={() => handleDeleteSection(section.id)}
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TemplateList from "@/components/TemplateList";
import TemplateEditor from "@/components/TemplateEditor";
import Notes from "@/components/Notes";
import { addTemplate, updateTemplate } from "@/features/templateSlice";
import { FaCog } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSave = (template) => {
    if (template.id) {
      dispatch(updateTemplate(template));
    } else {
      dispatch(addTemplate(template));
    }
    setSelectedTemplate(null);
    setIsEditing(false);
  };

  const handleAddNewTemplate = () => {
    setSelectedTemplate(null);
    setIsEditing(true);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-1 bg-white border rounded">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Templates</h2>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-gray-500 hover:text-black"
          >
            <FaCog size={20} />
          </button>
        </div>
        {showTemplates && (
          <>
            <button
              onClick={handleAddNewTemplate}
              className="px-4 py-2 mb-4 text-white bg-green-500 rounded"
            >
              Create New Template
            </button>
            <TemplateList
              onSelect={(template) => {
                setSelectedTemplate(template);
                setIsEditing(true);
              }}
            />
          </>
        )}
      </div>
      <div className="col-span-2 bg-white border rounded">
        <h2 className="p-4 text-xl font-bold border-b">
          {isEditing
            ? selectedTemplate?.id
              ? "Edit Template"
              : "Add Template"
            : "Notes"}
        </h2>
        {isEditing ? (
          <TemplateEditor template={selectedTemplate} onSave={handleSave} />
        ) : (
          <Notes />
        )}
      </div>
    </div>
  );
};

export default Home;

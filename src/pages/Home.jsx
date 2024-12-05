import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TemplateList from "@/components/TemplateList";
import TemplateEditor from "@/components/TemplateEditor";
import { addTemplate, updateTemplate } from "@/features/templateSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (template) => {
    if (template.id) {
      dispatch(updateTemplate(template));
      console.log({ update: template });
    } else {
      console.log({ new: template });
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
        <h2 className="p-4 text-xl font-bold border-b">Templates</h2>
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
      </div>
      <div className="col-span-2 bg-white border rounded">
        <h2 className="p-4 text-xl font-bold border-b">
          {isEditing ? "Edit Template" : "Select a Template"}
        </h2>
        {isEditing && (
          <TemplateEditor template={selectedTemplate} onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default Home;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TemplateEditor from "@/components/TemplateEditor";
import {
  addTemplate,
  updateTemplate,
  selectTemplates,
} from "@/features/templateSlice";

import Sidebar from "@/layout/Sidebar";

const TemplatesPage = () => {
  const dispatch = useDispatch();
  const templates = useSelector(selectTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="grid grid-cols-4 gap-4 p-4">
      <Sidebar title="Templates">
        <ul className="space-y-2">
          {templates.map((template) => (
            <li
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template);
                setIsEditing(true);
              }}
              className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-50"
            >
              {template.title}
            </li>
          ))}
        </ul>
      </Sidebar>
      <div className="col-span-3 p-4 bg-white border rounded">
        <h2 className="mb-4 text-xl font-bold">
          {isEditing ? "Edit Template" : "Add Template"}
        </h2>
        {isEditing ? (
          <TemplateEditor template={selectedTemplate} onSave={handleSave} />
        ) : (
          <button
            onClick={handleAddNewTemplate}
            className="px-4 py-2 text-white bg-green-500 rounded"
          >
            Create New Template
          </button>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;

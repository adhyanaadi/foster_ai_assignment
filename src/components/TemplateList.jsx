import { selectTemplates, deleteTemplate } from "@/features/templateSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const TemplateList = ({ onSelect }) => {
  const templates = useSelector(selectTemplates);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTemplate(id));
  };

  return (
    <div className="p-4 space-y-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex items-center justify-between p-4 border rounded hover:bg-gray-100"
        >
          <div className="cursor-pointer" onClick={() => onSelect(template)}>
            {template.title}
          </div>
          <button
            onClick={() => handleDelete(template.id)}
            className="px-2 py-1 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;

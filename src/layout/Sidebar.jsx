import React from "react";

const Sidebar = ({ title, children }) => {
  return (
    <div className="h-full p-4 bg-gray-100 border rounded">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as mammoth from "mammoth";

const DragAndDropUpload = ({ onTranscriptSet }) => {
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles) => {
    setError("");
    const file = acceptedFiles[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          onTranscriptSet(result.value.trim());
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        console.error("Error parsing the .docx file:", err);
        setError("Failed to parse the document.");
      }
    } else {
      setError("Please upload a valid .docx file.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="p-4 border-2 border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-100"
    >
      <input {...getInputProps()} />
      <p className="text-center text-gray-500">
        Drag & drop a .docx file here, or click to browse
      </p>
      {error && <p className="mt-2 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default DragAndDropUpload;

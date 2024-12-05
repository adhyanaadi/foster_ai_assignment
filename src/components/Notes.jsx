import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "@/features/notesSlice";
import { selectTemplates } from "@/features/templateSlice";
import gptClient, { generatePrompt } from "@/services/gpt.client";

const Notes = ({ selectedNote, onSave }) => {
  const dispatch = useDispatch();
  const templates = useSelector(selectTemplates);
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);

  const initialNoteData = {
    templateId: activeTemplate || templates[0]?.id,
    patientName: "",
    transcript: "",
    output: null,
  };

  const [noteData, setNoteData] = useState(initialNoteData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNoteData(selectedNote || initialNoteData);
  }, [selectedNote, activeTemplate]);

  const handleGenerateAndSave = async () => {
    const noteTemplateData = templates.find(
      (template) => template.id === noteData.templateId
    );
    const fallbackTemplateData = templates.find(
      (template) => template.id === activeTemplate
    );

    const templateDataToUse = noteTemplateData || fallbackTemplateData;

    if (!templateDataToUse || !templateDataToUse.sections) {
      alert("No sections found in the selected template");
      return;
    }

    if (!noteData.transcript) {
      alert("Transcript is required for generating output");
      return;
    }

    try {
      setLoading(true);
      const prompt = generatePrompt(
        noteData.transcript,
        templateDataToUse.sections
      );
      const generatedOutput = await gptClient(prompt);
      const parsedOutput = JSON.parse(generatedOutput);

      const updatedNoteData = {
        ...noteData,
        output: parsedOutput,
      };

      setNoteData(updatedNoteData);

      if (updatedNoteData.id) {
        dispatch(updateNote(updatedNoteData));
      } else {
        dispatch(addNote(updatedNoteData));
      }
    } catch (error) {
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTemplateName = () => {
    const template = templates.find(
      (template) => template.id === noteData.templateId
    );
    return template ? template.title : "Unknown Template";
  };

  return (
    <div className="px-4 space-y-4">
      <section className="flex gap-4">
        <div className="flex-1 space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={noteData.patientName}
            onChange={(e) =>
              setNoteData({ ...noteData, patientName: e.target.value })
            }
            className="w-full p-2 text-black bg-gray-100 border rounded"
          />
          <textarea
            placeholder="Transcript"
            value={noteData.transcript}
            onChange={(e) =>
              setNoteData({ ...noteData, transcript: e.target.value })
            }
            className="w-full p-2 text-black bg-gray-100 border rounded h-96"
          />
        </div>
        {noteData.output && (
          <div className="flex-1">
            <div className="p-4 bg-gray-100 border rounded">
              <h3 className="mb-2 text-lg font-bold">{getTemplateName()}</h3>
              {Object.entries(noteData.output).map(([title, content]) => (
                <div key={title} className="mb-4">
                  <h4 className="font-bold">{title}</h4>
                  <p className="text-gray-700">{content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <div className="flex gap-4">
        <button
          onClick={handleGenerateAndSave}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : noteData.id
            ? "Update Note"
            : "Generate & Save"}
        </button>
      </div>
    </div>
  );
};

export default Notes;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, selectNotes } from "@/features/notesSlice";
import { selectTemplates } from "@/features/templateSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const templates = useSelector(selectTemplates);

  const [newNote, setNewNote] = useState({
    templateId: "",
    patientName: "",
    transcript: "",
    output: "",
  });

  const handleSave = () => {
    if (newNote.templateId && newNote.patientName && newNote.transcript) {
      dispatch(addNote(newNote));
      setNewNote({
        templateId: "",
        patientName: "",
        transcript: "",
        output: "",
      });
    } else {
      // TODO
      // add toast to show all fields are required
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-bold">Add New Note</h3>
      <select
        value={newNote.templateId}
        onChange={(e) => setNewNote({ ...newNote, templateId: e.target.value })}
        className="w-full p-2 text-black bg-gray-100 border rounded"
      >
        <option value="">Select Template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Patient Name"
        value={newNote.patientName}
        onChange={(e) =>
          setNewNote({ ...newNote, patientName: e.target.value })
        }
        className="w-full p-2 text-black bg-gray-100 border rounded"
      />
      <textarea
        placeholder="Transcript"
        value={newNote.transcript}
        onChange={(e) => setNewNote({ ...newNote, transcript: e.target.value })}
        className="w-full p-2 text-black bg-gray-100 border rounded"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
      >
        Save Note
      </button>
      <h3 className="mt-8 text-lg font-bold">Existing Notes</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="p-2 mt-2 border rounded">
            <p>
              <strong>Patient:</strong> {note.patientName}
            </p>
            <p>
              <strong>Template:</strong>{" "}
              {templates.find((t) => t.id === note.templateId)?.title ||
                "Unknown"}
            </p>
            <p>
              <strong>Transcript:</strong> {note.transcript}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;

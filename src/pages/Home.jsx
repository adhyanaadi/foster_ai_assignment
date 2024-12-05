import React, { useState } from "react";
import Notes from "@/components/Notes";
import { useSelector } from "react-redux";
import { selectNotes } from "@/features/notesSlice";

import Sidebar from "@/layout/Sidebar";

const Home = () => {
  const notes = useSelector(selectNotes);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <Sidebar title="Notes">
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedNote(note)}
            >
              <p className="font-bold">{note.patientName}</p>
              <p className="text-sm text-gray-500">
                {note.transcript.slice(0, 50)}...
              </p>
            </li>
          ))}
        </ul>
      </Sidebar>
      <div className="col-span-3">
        <Notes
          selectedNote={selectedNote}
          onSave={() => setSelectedNote(null)}
        />
      </div>
    </div>
  );
};

export default Home;

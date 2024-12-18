import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const Landing = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const user = auth.currentUser;
  const Savenote = async () => {
    if (note.trim() === "") return alert("note cannot be empty");
    if (!user) return alert("user not authenticated");
    try {
      await addDoc(collection(db, "notes"), {
        uid: user.uid,
        email: user.email,
        content: note,
        createdAt: new Date().toISOString(),
      });
      setNote("");
      fetchNotes();
      console.log("note saved!");
    } catch (e) {
      console.error("error saving note", e);
    }
  };

  const delnote = async (noteId) => {
    if (!noteId) {
      console.error("Error: noteId is undefined.");
      return;
    }
    if (!user) return;
    try {
      await deleteDoc(doc(db, "notes", noteId));
      fetchNotes();
      console.log("note deleted!");
    } catch (e) {
      console.log("error deleting notes", e);
    }
  };
  const Startediting = (noteId, currentcontent) => {
    setEditId(noteId);
    setEditContent(currentcontent);
  };
  const SaveEdit = async () => {
    if (editContent.trim === "") return alert("note cannot be empty");
    try {
      const noteRef = doc(db, "notes", editId);
      await updateDoc(noteRef, { content: editContent });
      setEditId(null);
      setEditContent("");
      fetchNotes();
      alert("note updated");
    } catch (e) {
      console.log("error occured updating note", e);
    }
  };

  const fetchNotes = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "notes"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchednotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchednotes);
    } catch (e) {
      console.error("error fetching notes", e);
    }
  };
  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);
  const Delnote = () => {
    setNotes([]);
    alert("All notes cleared locally! Refresh to fetch notes from Firestore.");
  };

  const navigate = useNavigate();
  useEffect(() => {
    const userdata = localStorage.getItem("user");

    const parseddata = JSON.parse(userdata);
    console.log("data", parseddata);
    if (!userdata) {
      navigate("/login");
    } else {
      navigate("/Landing");
    }
  }, []);
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Your Notepad</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Write your note here..."
      />
      <button
        onClick={Savenote}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Save Note
      </button>
      <button
        onClick={() => Delnote()}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        delete note
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Your Notes</h2>
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-white p-2 my-2 rounded shadow flex justify-between items-center"
            >
              {editId === note.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                  <button
                    onClick={SaveEdit}
                    className="bg-green-500 text-white py-1 px-2 rounded mx-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white py-1 px-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{note.content}</p>
                  <div>
                    <button
                      onClick={() => Startediting(note.id, note.content)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => delnote(note.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

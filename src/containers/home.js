import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib"; // Ensure this import is correct
import { useHistory } from "react-router-dom"; // Assuming you may need it for routing
import "./Home.css"; // Add your CSS file if needed

export default function Home({ isAuthenticated }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes when component mounts or when isAuthenticated changes
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return; // Don't attempt to load notes if the user isn't authenticated
      }

      try {
        const notes = await loadNotes();
        setNotes(notes); // Set the notes in state
      } catch (e) {
        onError(e); // Handle any errors while loading notes
      }
      setIsLoading(false); // Set loading state to false after fetching is done
    }

    onLoad();
  }, [isAuthenticated]); // This effect runs whenever `isAuthenticated` changes

  // Function to load notes from the API
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  // Render the notes list
  function renderNotesList(notes) {
    return notes.map((note) => (
      <ListGroup.Item key={note.id}>
        {/* Render the note content */}
        <div>{note.content}</div>
      </ListGroup.Item>
    ));
  }

  // Render notes if they are loaded, else show a loading spinner
  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  // Render the landing page or notes based on authentication
  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}

import AuthenticatedRoute from "./components/AuthenticatedRoute";
 import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Settings from "./containers/Settings"; // Import Settings component
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound"; // Import NotFound component
import Login from "./containers/Login"; // Import Login component
import Signup from "./containers/Signup"; // Import Signup component
import NewNote from "./containers/NewNote"; // Import NewNote component
import Notes from "./containers/Notes"; // Import the Notes component to view a specific note

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> {/* Route for the Login page */}
      <Route path="/signup" element={<Signup />} /> {/* Route for the Signup page */}
      
      {/* Add route for the Settings page */}
      <Route path="/settings" element={<Settings />} /> {/* Route for the Settings page */}

      <Route path="/notes/new" element={<NewNote />} /> {/* Route for creating a new note */}
      
      {/* Add route for displaying a specific note based on the note ID */}
      <Route path="/notes/:id" element={<Notes />} /> {/* Route for viewing a specific note */}

      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import { onError } from "./libs/errorLib";
import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate hook
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "./App.css";

// Example pages for routes
const SignupPage = () => <div>Signup Page</div>;
const LoginPage = () => <div>Login Page</div>;

function App() {
  // State to manage authentication status
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userHasAuthenticated, setUserHasAuthenticated] = useState(false);

  const navigate = useNavigate(); // useNavigate hook for routing

  // Authentication check
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setUserHasAuthenticated(true); // Corrected function call
      setIsAuthenticated(true); // Updated authentication state
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
      setIsAuthenticated(false); // If no session, set authenticated state to false
    }
    setIsAuthenticating(false); // Done authenticating
  }

  // Logout handler
  async function handleLogout() {
    await Auth.signOut();
    setUserHasAuthenticated(false); // Corrected function call
    setIsAuthenticated(false); // Set to false on logout
    navigate("/login"); // Using navigate instead of history.push
  }

  // If still authenticating, don't render the app
  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Providing authentication context */}
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes>
          {/* Define the routes here */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes here */}
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;

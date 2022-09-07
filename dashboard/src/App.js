import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Form from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AuthContext from "./context/authContext";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <AuthContext.Provider value={[isAuthenticated, setAuthenticated]}>
          <Router>
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Form
                      authenticated={isAuthenticated}
                      setIsAuthenticated={setAuthenticated}
                    />
                  ) : (
                    <Navigate to="/dashboard"></Navigate>
                  )
                }
              ></Route>
              <Route
                exact
                path="/signup"
                element={
                  !isAuthenticated ? (
                    <SignupForm />
                  ) : (
                    <Navigate to="/dashboard"></Navigate>
                  )
                }
              ></Route>
              <Route
                exact
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              ></Route>
            </Routes>
          </Router>
        </AuthContext.Provider>
      </header>
    </div>
  );
}

export default App;

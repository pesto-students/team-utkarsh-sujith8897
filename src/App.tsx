import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AuthProvider } from "./hooks/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./hooks/Toast";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { FormPage } from "./components/FormPage";
import { BackdropProvider } from "./hooks/Backdrop";
import { SubmissionPage } from "./components/SubmissionPage";
import { FormEdit } from "./components/FormEdit";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Router>
        <AuthProvider>
          <ToastProvider>
            <BackdropProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forms/:id/edit"
                  element={
                    <ProtectedRoute>
                      <FormEdit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forms/:id"
                  element={
                    <ProtectedRoute>
                      <SubmissionPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/r/:id" element={<FormPage />} />
              </Routes>
            </BackdropProvider>
          </ToastProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

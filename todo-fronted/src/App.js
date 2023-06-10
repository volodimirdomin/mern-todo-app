import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import EditPage from "./components/EditPage";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  if (!ready) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      {isAuthenticated && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit-todo" element={<EditPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}

      {!isAuthenticated && (
        <BrowserRouter>
          <Routes>
            <Route path="/login" index element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </AuthContext.Provider>
  );
}

export default App;

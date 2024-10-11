import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Signup";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

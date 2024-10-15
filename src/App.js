import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <div style={{ margin: "0,2em" }}>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

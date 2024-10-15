import React from "react";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button onClick={handleSignup} class="button is-primary">
                  Sign up
                </button>
                {user ? (
                  <button onClick={handleLogout} class="button is-light">
                    Log out
                  </button>
                ) : (
                  <button onClick={handleLogin} class="button is-light">
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

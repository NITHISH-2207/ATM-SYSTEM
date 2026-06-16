import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <Dashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }
  return (
    <>
      {showLogin ? (
        <Login
          setUser={setUser}
          setShowLogin={setShowLogin}
        />
      ) : (
        <Signup
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
}

export default App;
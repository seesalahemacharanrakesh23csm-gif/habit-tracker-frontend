import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MainPage from "./components/MainPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user && (
        <>
          <LoginPage setUser={setUser} />
          <RegisterPage setUser={setUser} />
        </>
      )}
      {user && <MainPage user={user} setUser={setUser} />}
    </div>
  );
}

export default App;











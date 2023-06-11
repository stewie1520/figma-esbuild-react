import React, { useEffect, useState } from "react";
import "./App.css";
import { Login, Portal } from "./screens";

function App() {
  const [showingLogin, setShowingLogin] = useState(true)

  useEffect(() => {
    window.onmessage = (e) => {
      const { type } = e.data.pluginMessage
      console.log(e.data.pluginMessage)
      if (type === 'login') {
        setShowingLogin(true)
        return
      }

      if (type === 'portal') {
        setShowingLogin(false)
        return
      }
    }
  }, [setShowingLogin])
 
  return (
    <div>
     {showingLogin ? (
      <Login/>
     ) : (
      <Portal/>
     )}
    </div>
  );
}

export default App;

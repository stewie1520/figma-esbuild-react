import React from "react"

export const Portal = () => {
  const handleLogout = () => {
    parent.postMessage({ pluginMessage: { type: 'auth:logout' } }, '*')
  }

  return (
    <div>
      <h1>Portal</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}
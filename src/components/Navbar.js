import React from 'react';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">Habit Tracker</div>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="user">{user.username}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <span>Please login</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
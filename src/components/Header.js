import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const changeTheme = () => {
    document.body.classList.toggle("light-theme");
  };

  return (
    <div>
      <header className="header">
        <Link to="/">
          <div>
            <h1>Countries API</h1>
          </div>
        </Link>
        <div>
          <button className="btn-moon" onClick={changeTheme}>
            <i className="fas fa-moon"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;

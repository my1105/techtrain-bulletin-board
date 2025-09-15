import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/threads" className="header-title">
          掲示板
        </Link>
      </div>
      <div className="header-right">
        <Link to="/threads/new" className="new-thread-link">
          スレッドを立てる
        </Link>
      </div>
    </header>
  );
}

export default Header;

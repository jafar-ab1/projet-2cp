import { useLocation } from "react-router-dom";
import "./SideBar.css";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/front-desk", label: "Front Desk" },
    { href: "/guest", label: "Guest" },
    { href: "/rooms", label: "Rooms" },
    { href: "/deal", label: "Deals" },
    { href: "/rate", label: "Rate" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Hotel</h2>
      <nav className="nav">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={currentPath === link.href ? "active" : ""}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

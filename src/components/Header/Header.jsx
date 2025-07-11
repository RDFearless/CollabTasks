import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutBtn, Container } from "../index.js";

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Define nav items with visibility conditions
  const navItems = [
    { name: "Home", path: "/", active: true }, // Always show Home
    { name: "Login", path: "/login", active: !isAuthenticated },
    { name: "Signup", path: "/signup", active: !isAuthenticated },
    {
      name: "Add Collection",
      path: "/add-collection",
      active: isAuthenticated,
    },
    { name: "Profile", path: "/profile", active: isAuthenticated },
  ];

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-bold tracking-tight flex items-center bg-transparent border-none cursor-pointer"
            >
              <span className="bg-blue-600 text-white p-2 rounded mr-2">
                CT
              </span>
              <span className="hidden sm:inline">CollabTasks</span>
            </button>
          </div>

          <ul className="flex ml-auto items-center space-x-3 md:space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700 text-sm md:text-base bg-transparent border-none cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {isAuthenticated && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

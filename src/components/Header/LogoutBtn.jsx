import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../api/auth.js";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-all duration-200 ease-in-out shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

import { useSelector } from "react-redux";
import { Container, Button, LogoutBtn } from "./index.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  if (!userData) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
          <h2 className="text-2xl font-bold text-red-500">Not Authenticated</h2>
          <p className="mt-2 text-gray-600">
            Please login to view your profile.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gray-800 text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Profile</h1>
              <LogoutBtn />
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* User Avatar */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                  {userData?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {userData?.fullname || userData?.username}
                  </h2>
                  <p className="text-gray-600">@{userData?.username}</p>
                </div>
              </div>

              {/* User Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      {userData?.fullname || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      {userData?.username}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      {userData?.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Created
                    </label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    className="bg-gray-600 hover:bg-gray-700"
                    onClick={() => {}}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;

import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="text-center my-10">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
      >
        Logout
      </button>
    </div>
  );
}

import React from "react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Settings</h1>

        {/* Change Password Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">Change Password</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="current-password"
                className="block text-gray-600 font-medium mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-gray-600 font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-gray-600 font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="button"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Essential Options Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Essential Options
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">Enable Notifications</p>
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">Dark Mode</p>
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">Email Updates</p>
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

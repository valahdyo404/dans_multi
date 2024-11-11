import React from 'react';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    {/* Header */}
    <header className="bg-blue-600 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-2xl font-bold">GitHub Jobs</h1>
        </div>
      </header>
    <main>{children}</main>
  </div>
);

export default Layout;

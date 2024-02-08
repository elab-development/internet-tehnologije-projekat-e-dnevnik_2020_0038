import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <head>
        <meta name="csrf-token" content="{{ csrf_token() }}" />
      </head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

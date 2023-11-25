import React, { ReactNode } from "react";

import './main-nav-bar.css'

type Props = {
  children: ReactNode,
}

export default function NavBar({ children }: Props) {
  return (
    <nav className="navbar navbar-expand bg-primary sticky-top main-navbar" data-bs-theme="dark">
      <div className="container-fluid">
        <ul className="navbar-nav mb-lg-0">
          {children}
        </ul>
      </div>
    </nav>
  )
}

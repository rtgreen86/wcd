import React, { ReactNode } from "react";

type Props = {
  children: ReactNode,
}

export default function NavBar({ children }: Props) {
  return (
    <nav className="navbar navbar-expand bg-primary sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {children}
        </ul>
      </div>
    </nav>
  )
}

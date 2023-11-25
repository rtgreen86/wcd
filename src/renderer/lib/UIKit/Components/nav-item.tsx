import React, { ReactNode } from "react";

type Props = {
  children: ReactNode,
  position?: string,
}

export default function NavItem({ children }: Props) {
  return (<li className="nav-item">{children}</li>);
}

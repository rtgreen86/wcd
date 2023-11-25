import React, { ReactNode } from "react";

import './nav-item.css';

type Props = {
  children: ReactNode,
  position?: 'left' | 'right',
}

export default function NavItem({ children, position = 'left' }: Props) {
  return (<li className={`nav-item ${position}`}>{children}</li>);
}

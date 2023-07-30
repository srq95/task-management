import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

const SimpleLayout: React.FC<ChildrenProps> = ({ children }) => {
  return <>{children}</>;
};

export default SimpleLayout;

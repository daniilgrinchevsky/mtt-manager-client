import React, {ReactNode} from "react";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  // if (!localStorage.getItem("authUser")) {
  //   return <Navigate to={{ pathname: "/login" }} />;
  // }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;

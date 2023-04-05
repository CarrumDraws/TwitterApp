import React, { useContext } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

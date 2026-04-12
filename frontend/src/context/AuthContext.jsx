import { createContext, useState } from 'react';

const AuthContext = createContext(null);


// AuthProvider is a component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (userData, accessToken) => {
    setToken(accessToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    // .provider 
    <AuthContext value={{ token, user, login, logout }}>
      {children}
    </AuthContext>
  );
};

export default AuthContext;
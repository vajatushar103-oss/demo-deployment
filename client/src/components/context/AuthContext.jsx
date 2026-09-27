import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { } from '../../services/api.js';

// const AuthContext = createContext(null);
export const AuthContext = createContext();
const TOKEN_KEY = 'prime_access_token';
const USER_KEY = 'prime_auth_user';

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
//     } catch {
//       return null;
//     }
//   });
//   // const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));
//   const [loading, setLoading] = useState(true);

//   const logout = useCallback(() => {
//     localStorage.removeItem(TOKEN_KEY);
//     localStorage.removeItem(USER_KEY);
//     setUser(null);
//   }, []);

//   const login = useCallback(async (email, password) => {
//     const data = await authService.login({ email, password });
//     localStorage.setItem(TOKEN_KEY, data.token);
//     localStorage.setItem(USER_KEY, JSON.stringify(data.user));
//     setUser(data.user);
//     return data.user;
//   }, []);

//   useEffect(() => {
//     if (!localStorage.getItem(TOKEN_KEY)) {
//       setLoading(false);
//       return;
//     }

//     authService.me()
//       .then((data) => {
//         localStorage.setItem(USER_KEY, JSON.stringify(data.user));
//         setUser(data.user);
//       })
//       .catch(() => logout())
//       .finally(() => setLoading(false));
//   }, [logout]);

//   const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);


  return(
    <AuthContext.Provider value={{user, setUser, loading, setLoading, isAuthenticated, setAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

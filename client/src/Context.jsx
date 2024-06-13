import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth, admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthContextProvider }
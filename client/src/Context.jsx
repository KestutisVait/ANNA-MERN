import { createContext, useState } from "react";

const AuthContext = createContext();
const ArticleContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth, admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    )
};

const ArticleContextProvider = ({ children }) => {

    const [articles, setArticles] = useState([]);

    return (
        <ArticleContext.Provider value={{ articles, setArticles }}>
            {children}
        </ArticleContext.Provider>
    )
};

export { AuthContext, AuthContextProvider, ArticleContext, ArticleContextProvider }
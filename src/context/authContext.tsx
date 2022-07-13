import {createContext, ReactNode, useCallback, useState} from "react";


interface AuthContextInterface {
    userName: string | null;
    isLoggedIn: boolean;
    login: (token: string, name: string) => void
    logout: () => void
}

interface Props {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextInterface>({
        userName: "",
        isLoggedIn: false,
        login: (token: string, name: string) => {
        },
        logout: () => {
        }
    }
);

const AuthContextProvider = (props: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem("token") !== null);
    const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

    const login = useCallback((token: string, name: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userName", name);
        setIsLoggedIn(true);
        setUserName(name);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName(null);
    }

    const authContext = {userName, isLoggedIn, login, logout}

    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
}

export {AuthContext, AuthContextProvider};
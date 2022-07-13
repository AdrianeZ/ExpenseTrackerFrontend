import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {MainNav} from "./components/Layout/MainNav";
import {AuthForm} from "./components/Forms/AuthForm";
import {MainContainer} from "./components/Layout/MainContainer";
import {AuthContext, AuthContextProvider} from "./context/authContext";


const App = () => {

    const {isLoggedIn} = useContext(AuthContext)

    return (
        <>
            <AuthContextProvider>
                <MainNav/>
                <Routes>
                    {!isLoggedIn &&
                    <>
                        <Route path="/register"
                               element={<MainContainer><AuthForm isLoginForm={false}/></MainContainer>}></Route>
                        <Route path="/login"
                               element={<MainContainer><AuthForm isLoginForm={true}/></MainContainer>}></Route>
                        <Route path="/expenses"
                               element={<MainContainer><AuthForm isLoginForm={true}/></MainContainer>}></Route>
                    </>
                    }
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export {App};

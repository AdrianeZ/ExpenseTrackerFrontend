import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainNav} from "./components/Layout/MainNav";
import {AuthForm} from "./components/Forms/AuthForm";
import {MainContainer} from "./components/Layout/MainContainer";


const App = () => {
    return (
        <>
            <MainNav/>
            <Routes>
                <Route path="/register"
                       element={<MainContainer><AuthForm isLoginForm={false}/></MainContainer>}></Route>
                <Route path="/login" element={<MainContainer><AuthForm isLoginForm={true}/></MainContainer>}></Route>
            </Routes>
        </>
    );
}

export {App};

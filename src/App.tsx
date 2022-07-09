import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainNav} from "./components/Layout/MainNav";
import {AuthForm} from "./components/Forms/AuthForm";


const App = () => {
    return (
        <>
            <MainNav/>
            <Routes>
                <Route path="/signup" element={<AuthForm/>}></Route>
                <Route path="/login" element={<AuthForm/>}></Route>
            </Routes>
        </>
    );
}

export {App};

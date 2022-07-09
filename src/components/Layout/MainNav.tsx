import React from "react";

import "./MainNav.css";


const MainNav = () => {
    return <header className="header">
        <h1>
            Expense Tracker
        </h1>
        <nav className="nav">
            <div>
                SignUp
            </div>
            <div>
                Login
            </div>
        </nav>
    </header>
}

export {MainNav};
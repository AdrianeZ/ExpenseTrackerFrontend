import React from "react";

import "./MainNav.css";
import {Link} from "react-router-dom";


const MainNav = () => {
    return <header className="header">
        <h1>
            Expense Tracker
        </h1>
        <nav className="nav">
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    </header>
}

export {MainNav};
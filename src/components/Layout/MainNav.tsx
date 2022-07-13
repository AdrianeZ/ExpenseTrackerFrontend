import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import "./MainNav.css";


const MainNav = () => {

    const {isLoggedIn, userName, logout} = useContext(AuthContext);


    return <header className="header">
        <h1>
            Expense Tracker
        </h1>
        {
            isLoggedIn && userName ?
                <button className="header__logout" onClick={logout}>Logout</button> :
                <nav className="nav">
                    <div>
                        <Link to="/register">Register</Link>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                </nav>
        }

    </header>
}

export {MainNav};
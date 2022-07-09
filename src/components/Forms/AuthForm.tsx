import {useState} from "react";

const AuthForm = () => {

    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

    const switchForm = () => {
        setIsLoginForm((isLoginForm) => !isLoginForm);
    }

    return (
        <section>
            <h2>{isLoginForm ? "Login with Existing Account" : "Register new Account"}</h2>
            <form>
                <label htmlFor="name">
                    <input
                        type="text"
                        id="name"
                        name="email"
                        placeholder="Enter your name"/>
                </label>
                {!isLoginForm && <label htmlFor="email">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"/>
                </label>}
                <label htmlFor="password">
                    <input
                        type="text"
                        id="password"
                        placeholder="Enter your password"/>
                </label>
                {!isLoginForm && <label htmlFor="confirm-password">
                    <input
                        type="text"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm your Password"/>
                </label>}
                <input type="submit" value={isLoginForm ? "Login" : "Register"}/>
                <button onClick={switchForm}
                        type="button">{isLoginForm ? "Switch To Register Form" : "Switch to Login Form"}</button>
            </form>
        </section>
    );
}

export {AuthForm}
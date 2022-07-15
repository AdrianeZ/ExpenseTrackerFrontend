import {Link} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {ChangeEvent, SyntheticEvent, useState, useContext, useEffect} from "react";
import {AuthContext} from "../../context/authContext";
import {CreateUserDto, LoginUserDto, HttpMethod, CreateUserResponse} from "types"
import {Modal} from "../Layout/Modal";
import {useNavigate} from "react-router-dom"
import "./AuthForm.css";


interface Props {
    isLoginForm: boolean;
}


const AuthForm = ({isLoginForm}: Props) => {

    const [authFormData, setAuthFormData] = useState<CreateUserDto>({
        name: "",
        email: "",
        passwordConfirm: "",
        password: ""
    });

    const navigate = useNavigate();

    const {error, isLoading, data, makeRequest, setError} = useFetch<CreateUserResponse>();

    const {login} = useContext(AuthContext);

    useEffect(() =>
    {
        if (data?.user.token) {
            login(data.user.token, data.user.name);
            navigate("/expenses");
        }
    },[data, login, navigate])


    const updateAuthForm = (event: ChangeEvent<HTMLInputElement>) => {

        setAuthFormData(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    const handleAuth = (e: SyntheticEvent) => {
        e.preventDefault();
        const url = isLoginForm ? "http://localhost:3001/api/login" : "http://localhost:3001/api/register";
        const requestBody: CreateUserDto | LoginUserDto = isLoginForm ?
            {email: authFormData.email, password: authFormData.password.trim()}
            : authFormData
        makeRequest(url, HttpMethod.POST, JSON.stringify(requestBody), {"Content-Type": "application/json"});
    }


    const changeModalVisibility = () => {
        setError(undefined);
    }

    return (
        <>
            <Modal type="error" show={!!error} changeVisibility={changeModalVisibility} title="Error">{error}</Modal>
            <section className="auth">
                <header
                    className="auth__header">{isLoginForm ? "Login with Existing Account" : "Register new Account"}</header>
                <form onSubmit={handleAuth}>
                    <div className="form-control">
                        {!isLoginForm && <label htmlFor="name">
                            <input
                                required={true}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                onChange={updateAuthForm}
                                value={authFormData.name}/>
                        </label>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">
                            <input
                                required={true}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={updateAuthForm}
                                value={authFormData.email}/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">
                            <input
                                required={true}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={updateAuthForm}
                                value={authFormData.password}/>
                        </label>
                    </div>
                    <div className="form-control">
                        {!isLoginForm && <label htmlFor="passwordConfirm">
                            <input
                                required={true}
                                type="password"
                                id="confirmPassword"
                                name="passwordConfirm"
                                placeholder="Confirm your Password"
                                onChange={updateAuthForm}
                                value={authFormData.passwordConfirm}/>
                        </label>}
                    </div>
                    <div className="auth__button-container">
                         <Link to={isLoginForm ? "/register" : "/login"}
                              className="auth__switch">{isLoginForm ? "Register" : "Login"}</Link>
                        { !isLoading ? <input type="submit" value="Submit"/> : "Sending Request"}
                    </div>
                </form>
            </section>
        </>
    );
}

export {AuthForm}
import * as React from "react";

const Login = ({props, handleLogin}) => {

    let loginInput = React.createRef();
    let passwordInput = React.createRef();

    function login() {
        if (handleLogin(loginInput.current.value, passwordInput.current.value)) {
            props.history.push('/todo');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <label>
                <p>Username</p>
                <input type="text" ref={loginInput}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" ref={passwordInput}/>
            </label>
            <div>
                <button onClick={() => login()}>Submit</button>
            </div>
        </div>
    );
}

export default Login;

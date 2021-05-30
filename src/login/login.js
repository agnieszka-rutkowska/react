import * as React from "react";
import {MOCK_LOGIN, MOCK_PASSWORD} from "./../const";

const Login = props => {

    let loginInput = React.createRef();
    let passwordInput = React.createRef();

    function handleLogin() {
        if(loginInput.current.value === MOCK_LOGIN && passwordInput.current.value === MOCK_PASSWORD){
            props.history.push('/todo')   
        } else {
            alert("Błedne dane logowania");
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
                <button onClick={handleLogin}>Submit</button>
            </div>
        </div>
    );
}

export default Login;

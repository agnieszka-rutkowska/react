import "./App.css";
import Login from "./login/login";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import TodoPage from "./todo/todoPage";
import {MOCK_LOGIN, MOCK_PASSWORD} from "./const";
import React, {Component, useState} from "react";

class App extends Component {
    isAutheticated = false;

    handleLogin = (login, password) => {
        if (login === MOCK_LOGIN && password === MOCK_PASSWORD) {
            this.isAutheticated=true;
            return true;
        } else {
            alert("Błedne dane logowania");
        }
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-intro">
                        <Switch>
                            <Route exact path="/"
                                   render={(props) => (<Login handleLogin={this.handleLogin} props={props}/>)}/>
                            <Route exact path="/todo"
                                   render={props => (this.isAutheticated ? <TodoPage props={props}/> : <Redirect to='/'/>)}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

//https://jsonplaceholder.typicode.com/users/1/todos

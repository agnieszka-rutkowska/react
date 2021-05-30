import "./App.css";
import Login from "./login/login";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import TodoPage from "./todo/todoPage";

function App() {

return (
    <Router>
        <div className="App">
        <div className="App-intro">
            <Switch>
            <Route exact path="/"  component={Login} />
            <Route path="/todo" component={TodoPage} />
            </Switch>
        </div>
        </div>
    </Router>
    );
}

export default App;

//https://jsonplaceholder.typicode.com/users/1/todos

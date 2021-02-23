import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Customers from "./pages/Customers";
import Merchants from "./pages/Merchants";

function App() {
    return (
        <Switch>
            <AppHeader>
                <Route exact path='/merchants' component={Merchants}/>
                <Route exact path='/customers' component={Customers}/>
                <Route exact path="/">
                    <Redirect to="/merchants" />
                </Route>
            </AppHeader>
        </Switch>
    );
}

export default App;

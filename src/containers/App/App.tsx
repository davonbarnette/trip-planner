import React, {Component, useEffect} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {Layout} from "antd";

import './styles.scss';

/* App Imports */
import HAppHeader from "./AppHeader/HAppHeader";
import {AppRoutesRenders} from "./RoutesRegister";
import {BrowserRoutes} from "../../stores/App/BrowserRouter";
import AppActions from "../../stores/App/AppActions";
import AppStore from "../../stores/App/AppStore";
import Auth from "../../components/specific/Auth/Auth";
import Protected from "./Protected";

function App() {

    useEffect(() => {
        AppActions.checkForAuthToken();
    },[])

    function getRoutes(){
        if (!AppStore.authTokenChecked) return null;
        else if (AppStore.authToken) return <Route component={Protected}/>
        else if (!AppStore.authToken) return <Route component={Auth}/>
        else return null;
    }

    return (
        <Layout className='app' id='app' style={{height: '100vh'}}>
            <Switch>
                {getRoutes()}
            </Switch>
        </Layout>
    );
}

export default withRouter(observer(App));

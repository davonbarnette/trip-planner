import React, {Component, useEffect} from 'react';
import {Redirect, Switch, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {Layout} from "antd";

import './styles.scss';

/* App Imports */
import {AppRoutesRenders} from "./RoutesRegister";
import {LoadingOutlined} from "@ant-design/icons";
import HAppHeader from './AppHeader/HAppHeader';
// import Logo from "../../../assets/logo.png";
import AppStore from "../../stores/App/AppStore";
import {BrowserRoutes} from "../../stores/App/BrowserRouter";

const {Content} = Layout;

function Protected() {

    useEffect(() => {
        AppStore.init();
    }, [])

    if (!AppStore.necessaryDataIsLoaded) {
        return (
            <div className='loading-app'>
                <div className='bounce'>
                    {/*<img alt="Logo" src={Logo} style={{height: 50, width: 50}}/>*/}
                </div>
                <div className='loading-text'>
                    <LoadingOutlined spin/>
                    Loading your trips...
                </div>
            </div>
        );
    }

    return (
        <>
            <HAppHeader/>
            <Layout style={{background: 'white'}}>
                <Content className='app-content'>
                    <Switch>
                        {AppRoutesRenders}
                        <Redirect key={0} to={BrowserRoutes.trips}/>
                    </Switch>
                </Content>
            </Layout>
        </>
    );
}

export default withRouter(observer(Protected));

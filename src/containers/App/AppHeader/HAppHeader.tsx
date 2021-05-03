import cx from 'classnames';
import React, {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {Layout, Menu} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";

import './styles.scss';

import { AppRoutesPathReference, AppHeaderItemsMap } from '../RoutesRegister';
import BrowserRouter, { BrowserRoutes } from '../../../stores/App/BrowserRouter';
import AppActions from "../../../stores/App/AppActions";


const {Header} = Layout;

interface Props extends RouteComponentProps {

}

interface State {
    collapsed:boolean,
    showMobileMenu:boolean,
}

class AppHeader extends Component<Props, any> {

    state:State = {
      collapsed:false,
        showMobileMenu:false,
    };

    get selectedKey() {
        for (let key in AppRoutesPathReference){
            if(this.props.location.pathname.includes(AppRoutesPathReference[key].path)) {
                return key;
            }
        }

        return '';
    }
    get menuItems(){
        return AppHeaderItemsMap.map(appRouteHeader => {
            const {key, icon, path} = appRouteHeader;
            return(
                <div key={key} onClick={()=>BrowserRouter.push(path)} className={cx('single-menu-item', {selected: key === this.selectedKey})}>
                    {icon}
                    <span>{key}</span>
                </div>
            )
        })
    }
    get menu(){
        return (
            <Menu className='ant-custom-menu-override'>
                <Menu.Item className='single-action' onClick={AppActions.logout}>
                    <LogoutOutlined/>
                    <div className='right'>
                        <div className='title'>Logout</div>
                    </div>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <Header className='app-header'>
                <div className='content'>
                    <div className='app-header-left'>
                        <div className='logo' onClick={() => BrowserRouter.push(BrowserRoutes.home)}>
                            <div className='logo-text'>
                                <div className='logo-text-bottom'>Trip Planner</div>
                            </div>
                        </div>
                    </div>
                    <div className='full-width-menu'>
                        {this.menuItems}
                    </div>

                    <div className='app-header-right'>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(observer(AppHeader));

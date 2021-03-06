import React, {Component, CSSProperties} from 'react';
import cx from 'classnames';
import {LoadingOutlined} from '@ant-design/icons';

import './styles.scss'

interface ButtonProps {
    enabled?:boolean,
    onClick?:(e:React.MouseEvent<any>)=>void,
    style?:CSSProperties;
    className?:string,
    color?:'orange'|'blue'|'clear'|'red',
    icon?:any,
    loading?:boolean,
    htmlType?:'submit' | 'reset' | 'button',
    iconPosition?: "left"|"right"
}

export default class Button extends Component<ButtonProps, any> {

    static defaultProps = {
        enabled:true,
        iconPosition: "left",
    };

    onButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const { enabled, onClick } = this.props;
        if (!enabled) return null;
        else if (onClick) onClick(e);
    };

    get icon(){
        const { icon, loading } = this.props;
        if (loading) return <LoadingOutlined/>;
        else if (icon) return icon;
        else return null;
    }

    render(){
        const { enabled, children, style, className, color, loading, icon, htmlType, iconPosition } = this.props;

        return(
            <button className={cx('custom-button', className || '', color || 'orange', {enabled, loading, disabled:!enabled || loading})} type={htmlType || 'submit'} onClick={this.onButtonClick} style={style}>
                <div className='bar'/>
                {icon && iconPosition === 'left' && <div className='icon-left'>{icon}</div>}
                {children}
                {icon && iconPosition === 'right' && <div className='icon-right'>{icon}</div>}
            </button>
        )
    }

}
import React from 'react';
import {LoadingOutlined} from '@ant-design/icons';

import './styles.scss';

import Logo from '../../../assets/logo.png';

interface Props {
    text:string,
}

export default (props:Props) => {

    const {text} = props;

    return (
        <div className='default-loader'>
            <div className='bounce'>
                <img alt="Logo" src={Logo} style={{height: 50, width: 50}}/>
            </div>
            <div className='loading-text'>
                <LoadingOutlined spin/>
                {text}
            </div>
        </div>
    )
}
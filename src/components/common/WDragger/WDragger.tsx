import React, {Component} from 'react';
import {Upload} from 'antd';
import {UploadProps} from "antd/es/upload";

import './styles.scss';

interface Props extends  UploadProps{

}

class WDragger extends Component<Props>{

    render(){
        return (
            <Upload.Dragger {...this.props} className='dragger-wrapper'>
                {this.props.children}
            </Upload.Dragger>
        )
    }
}

export default WDragger;

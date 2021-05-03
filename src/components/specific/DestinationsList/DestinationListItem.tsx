import React, {useState} from 'react';

import './styles.scss';

import {List, Modal, Tooltip, Typography} from "antd";
import {ExpandOutlined, HeartOutlined} from "@ant-design/icons";
import {IDestination} from "../../../api/DestinationAPI/DestinationTypes";
import {IImage} from "../../../stores/App/Types";
import AppStore from "../../../stores/App/AppStore";
import Destination from "../Destination/Destination";

interface Props {
    destination:IDestination
}

function DestinationListItem(props:Props) {
    const [showDestination, setShowDestination] = useState(false);

    const {name, description, destination_images} = props.destination;
    function getStyle(destination_images:IImage[]){
        if (destination_images[0]){
            return {backgroundImage: `url(${AppStore.getStrapiImageURL(destination_images[0].url)})`};
        } else {
            return {background:'gray'};
        }
    }
    return (
        <List.Item className='destination-list-item'>
            <div className='img'
                 style={{...getStyle(destination_images)}}/>
            <div className='info'>
                <div className='name'>
                    {name}
                </div>
                <Typography.Paragraph className='description' ellipsis={{rows: 2}}>
                    {description}
                </Typography.Paragraph>
                <div className='actions'>
                    <Tooltip title='Favorite'>
                        <HeartOutlined/>
                    </Tooltip>
                    <Tooltip title='Expand'>
                        <ExpandOutlined onClick={() => setShowDestination(true)}/>
                    </Tooltip>
                </div>
            </div>
            <Modal visible={showDestination} width='100%' title={props.destination.name} onCancel={()=>setShowDestination(false)}>
                <div className='destination-list-item-modal-content'>
                    <Destination destination={props.destination}/>
                </div>
            </Modal>
        </List.Item>
    )
}

export default DestinationListItem;
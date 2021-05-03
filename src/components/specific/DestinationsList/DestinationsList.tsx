import React from 'react';
import {HeartOutlined, ExpandOutlined} from '@ant-design/icons';

import './styles.scss';

import {IDestination} from "../../../api/DestinationAPI/DestinationTypes";
import {List, Modal, Tooltip, Typography} from "antd";
import AppStore from "../../../stores/App/AppStore";
import {IImage} from "../../../stores/App/Types";
import Destination from "../Destination/Destination";
import DestinationListItem from "./DestinationListItem";

interface Props {
    destinations?: IDestination[]
}

function DestinationsList(props: Props) {
    const {destinations} = props;

    function getStyle(destination_images:IImage[]){
        if (destination_images[0]){
            return {backgroundImage: `url(${AppStore.getStrapiImageURL(destination_images[0].url)})`};
        } else {
            return {background:'gray'};
        }
    }

    function renderDestination(destination: IDestination) {
        return <DestinationListItem destination={destination}/>
    }

    return (
        <div className='destinations-list'>
            <List dataSource={destinations} itemLayout='vertical' renderItem={renderDestination}/>
        </div>
    )
}

export default DestinationsList;
import React from 'react';
import {HeartOutlined, ExpandOutlined, ArrowRightOutlined} from '@ant-design/icons';

import './styles.scss';

import {List, Tooltip, Typography} from "antd";
import {IFlight} from "../../../api/FlightAPI/FlightTypes";
import moment from "moment";

interface Props {
    flights?:IFlight[]
}

function FlightsList(props:Props){
    const {flights} = props;

    function renderFlight(flight:IFlight){
        const { depart_at, depart_airport, arrive_airport, arrive_at, seats, plane } = flight;
        return (
            <List.Item className='flight-list-item'>
                <div className='departure'>
                    <div className='date'>
                        Depart <span>{depart_airport}</span>
                    </div>
                    <div className='time'>
                        {moment(depart_at).format('DD MMM YY - hh:mm A')}
                    </div>
                </div>
                <ArrowRightOutlined style={{marginRight:18}}/>
                <div className='departure'>
                    <div className='date'>
                        Arrive <span>{arrive_airport}</span>
                    </div>
                    <div className='time'>
                        {moment(arrive_at).format('DD MMM YY - hh:mm A')}
                    </div>
                </div>
                <div className='info'>
                    <div className='seat'>
                        {seats}
                    </div>
                    <div className='seat'>
                        {plane}
                    </div>
                </div>
            </List.Item>
        )
    }

    return (
        <div className='flights-list'>
            <List dataSource={flights} itemLayout='vertical' renderItem={renderFlight}/>
        </div>
    )
}

export default FlightsList;
import React from 'react';
import {List, Popover, Typography} from 'antd';
import {TeamOutlined, EnvironmentOutlined, CalendarOutlined} from '@ant-design/icons';

import './styles.scss';

import {ITrip} from "../../../api/TripAPI/TripTypes";
import AppStore from "../../../stores/App/AppStore";
import NumbersUtil from "../../../global/utils/number";
import moment from "moment";
import BrowserRouter, {BrowserRoutes} from "../../../stores/App/BrowserRouter";

interface Props {
    trips:ITrip[]
}

function TripsList(props:Props) {
    const {trips} = props;

    function onClickTrip(tripId:number){
        BrowserRouter.push(BrowserRoutes.getTripById(tripId));
    }

    function renderTrip(trip: ITrip) {
        const {title, description, trip_image, id, users, destinations, start_date, end_date} = trip;
        return (
            <List.Item onClick={()=>onClickTrip(id)}>
                <div key={id} className='trips-list-item'>
                    <div className='image' style={{backgroundImage: `url("${AppStore.baseUrl}${trip_image.url}")`}}/>
                    <div className='content'>
                        <div className='header'>
                            <div className='title'>
                                {title}
                            </div>
                            <div className='days-until'>
                                {moment(start_date).diff(moment(), 'days')} days away
                            </div>
                        </div>
                        <Popover content={description} overlayStyle={{maxWidth:400}}>
                            <Typography.Paragraph ellipsis={{rows: 2}} className='description'>
                                {description}
                            </Typography.Paragraph>
                        </Popover>
                        <div className='statistics'>
                            <div className='statistic'>
                                <TeamOutlined/>
                                <div>{NumbersUtil.prependZeroToDuration(users.length)}</div>
                            </div>
                            <div className='statistic'>
                                <EnvironmentOutlined/>
                                <div>{NumbersUtil.prependZeroToDuration(destinations.length)}</div>
                            </div>
                            <div className='statistic' style={{marginLeft: 'auto'}}>
                                <CalendarOutlined/>
                                <div>{moment(start_date).format('DD MMM YY')} - {moment(end_date).format('DD MMM YY')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </List.Item>
        )
    }

    return (
        <div className='trips-list'>
            <List dataSource={trips} renderItem={renderTrip} grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
            }}/>
        </div>
    )
}

export default TripsList;
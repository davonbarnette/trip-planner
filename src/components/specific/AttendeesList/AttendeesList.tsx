import React from 'react';

import './styles.scss';

import {List, Tooltip, Typography} from "antd";
import {IUser} from "../../../api/UserAPI/UserTypes";

interface Props {
    users?:IUser[]
}

function AttendeesList(props:Props){
    const {users} = props;

    function renderAttendee(user:IUser){
        const {username, email, first_name, last_name} = user;
        return (
            <List.Item className='attendee-list-item'>
                <div className='username'>
                    {first_name} {last_name}
                </div>
                <div className='email'>
                    {email}
                </div>
            </List.Item>
        )
    }

    return (
        <div className='attendees-list'>
            <List dataSource={users} itemLayout='vertical' renderItem={renderAttendee}/>
        </div>
    )
}

export default AttendeesList;
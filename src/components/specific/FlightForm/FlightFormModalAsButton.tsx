import React, {useState} from 'react';
import {Drawer, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';

import './styles.scss';
import Button from "../../common/Button/Button";
import FlightForm from "./FlightForm";
import {IFlightSubmitValuesRaw} from "../../../api/FlightAPI/FlightTypes";

interface Props {
    className?: string,
    onSubmit?: (values: IFlightSubmitValuesRaw) => Promise<void>,
}

function FlightFormModalAsButton(props:Props){
    const {className, onSubmit} = props;
    const [showForm, setShowForm] = useState(false);

    const onButtonClick = async (e: any) => {
        e.stopPropagation();
        setShowForm(true);
    }

    const onFormSubmit = async (values: any) => {
        if (onSubmit) await onSubmit(values);
        setShowForm(false);
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            <Button icon={<PlusOutlined/>} className={className} onClick={onButtonClick}>
                Add Leg
            </Button>
            <Modal title='Create Flight' centered keyboard={false} visible={showForm} destroyOnClose onCancel={()=>setShowForm(false)}
                    className='flight-form-drawer' footer={null}>
                <FlightForm applyDrawerStyles onSubmit={onFormSubmit}/>
            </Modal>
        </div>
    )
}

export default FlightFormModalAsButton;
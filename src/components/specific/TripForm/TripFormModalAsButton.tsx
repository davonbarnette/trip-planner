import React, {useState} from 'react';
import {Drawer, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';

import './styles.scss';
import Button from "../../common/Button/Button";
import TripForm from "./TripForm";

interface Props {
    className?: string,
    onSubmit?: (values: string) => void,
}

function TripFormModalAsButton(props:Props){
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
                New Trip
            </Button>
            <Modal title='Create Trip' centered keyboard={false} visible={showForm} destroyOnClose onCancel={()=>setShowForm(false)}
                    className='trip-form-drawer' footer={null}>
                <TripForm applyDrawerStyles onSubmit={onFormSubmit}/>
            </Modal>
        </div>
    )
}

export default TripFormModalAsButton;
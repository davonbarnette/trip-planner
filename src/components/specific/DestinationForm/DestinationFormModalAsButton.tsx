import React, {useState} from 'react';
import {Drawer, Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';

import './styles.scss';
import Button from "../../common/Button/Button";
import DestinationForm from "./DestinationForm";
import {IDestinationSubmitFormRaw} from "../../../api/DestinationAPI/DestinationTypes";

interface Props {
    className?: string,
    onSubmit?: (values: IDestinationSubmitFormRaw) => Promise<void>,
}

function DestinationFormModalAsButton(props:Props){
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
                New Destination
            </Button>
            <Modal title='Create Destination' centered keyboard={false} visible={showForm} destroyOnClose onCancel={()=>setShowForm(false)}
                    className='destination-form-drawer' footer={null}>
                <DestinationForm applyDrawerStyles onSubmit={onFormSubmit}/>
            </Modal>
        </div>
    )
}

export default DestinationFormModalAsButton;
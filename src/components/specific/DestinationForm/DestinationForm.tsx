import React, {useState, useRef} from 'react';
import {Form, Input} from 'antd';
import Button from "../../common/Button/Button";


import './styles.scss';

import {DestinationFormTypes} from "./DestinationFormTypes";
import cx from "classnames";
import {ArrowRightOutlined} from '@ant-design/icons';
import GeoSearchSelect from "../GeoSearchSelect/GeoSearchSelect";

interface Props {
    onSubmit: (values: any) => void
    applyDrawerStyles?: boolean,
}

function DestinationForm(props: Props) {
    const {onSubmit, applyDrawerStyles} = props;
    const [form] = Form.useForm();
    const antInputRef = useRef(null);

    // eslint-disable-next-line
    const [valuesForm, setValuesForm] = useState({});
    const [submittingForm, setSubmittingForm] = useState(false);

    async function onSubmitClick() {
        if (submittingForm) return false;
        setSubmittingForm(true);
        try {
            let valid = await form.validateFields();
            if (!valid.errorFields && onSubmit) {
                let values = form.getFieldsValue();
                onSubmit(values);
            }
        } catch (e) {

        }
        setSubmittingForm(false);
    }

    function onValuesChange(v) {
        setValuesForm(v);
    }

    function renderButton() {
        if (applyDrawerStyles) {
            return (
                <div className='form-stickied-footer'>
                    <Button onClick={onSubmitClick} htmlType='submit' loading={submittingForm}
                            icon={<ArrowRightOutlined/>} iconPosition='right'>
                        Create Trip
                    </Button>
                </div>
            )
        } else {
            return (
                <Button onClick={onSubmitClick} htmlType='submit' loading={submittingForm}>
                    Create Trip
                </Button>
            )
        }
    }

    let initialValues = {}

    return (
        <Form className={cx('destination-form', {'as-drawer': applyDrawerStyles})} name="destination-form"
              layout='vertical'
              form={form} initialValues={initialValues}
              autoComplete="off" preserve={false} onValuesChange={onValuesChange} requiredMark='optional'>
            <div className='destination-form-content'>
                <Form.Item label='Title' name={DestinationFormTypes.Address}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <GeoSearchSelect/>
                </Form.Item>
                <Form.Item label='Name' name={DestinationFormTypes.Name}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='Description' name={DestinationFormTypes.Description}>
                    <Input.TextArea size={{minRows: 2}} style={{resize: 'none'}}/>
                </Form.Item>
            </div>
            {renderButton()}
        </Form>
    );
}

export default DestinationForm;
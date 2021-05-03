import React, {useState} from 'react';
import {DatePicker, Form, Input, Upload} from 'antd';
import Button from "../../common/Button/Button";
import {InboxOutlined} from '@ant-design/icons';

import './styles.scss';

import {TripFormTypes} from "./TripFormTypes";
import cx from "classnames";
import {ArrowRightOutlined} from '@ant-design/icons';

interface Props {
    onSubmit: (values: any) => void
    applyDrawerStyles?: boolean,
}

function TripForm(props: Props) {
    const {onSubmit, applyDrawerStyles} = props;
    const [form] = Form.useForm();
    // eslint-disable-next-line
    const [valuesForm, setValuesForm] = useState({});
    const [submittingForm, setSubmittingForm] = useState(false);


    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

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

    async function uploadAction(){
        return true;
    }

    let initialValues = {}

    return (
        <Form className={cx('trip-form', {'as-drawer': applyDrawerStyles})} name="trip-form" layout='vertical'
              form={form} initialValues={initialValues}
              autoComplete="off" preserve={false} onValuesChange={onValuesChange} requiredMark='optional'>
            <div className='trip-form-content'>
                <Form.Item label='Title' name={TripFormTypes.Title}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='Description' name={TripFormTypes.Description}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input.TextArea rows={2} style={{resize: 'none'}}/>
                </Form.Item>
                <Form.Item label='Start Date' name={TripFormTypes.StartDate}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item label='End Date' name={TripFormTypes.EndDate}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="Image">
                    <Form.Item name={TripFormTypes.TripImage} valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" customRequest={uploadAction}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </div>
            {renderButton()}
        </Form>
    );
}

export default TripForm;
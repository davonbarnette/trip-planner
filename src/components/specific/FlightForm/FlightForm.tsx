import React, {useState} from 'react';
import {Col, DatePicker, Form, Input, Row, Upload} from 'antd';
import Button from "../../common/Button/Button";
import {InboxOutlined} from '@ant-design/icons';
import Autocomplete from 'react-google-autocomplete';

import './styles.scss';

import {FlightFormTypes} from "./FlightFormTypes";
import cx from "classnames";
import {ArrowRightOutlined} from '@ant-design/icons';

interface Props {
    onSubmit: (values: any) => void
    applyDrawerStyles?: boolean,
}

function FlightForm(props: Props) {
    const {onSubmit, applyDrawerStyles} = props;
    const [form] = Form.useForm();
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
                        Create Flight
                    </Button>
                </div>
            )
        } else {
            return (
                <Button onClick={onSubmitClick} htmlType='submit' loading={submittingForm}>
                    Create Flight
                </Button>
            )
        }
    }

    let initialValues = {}

    return (
        <Form className={cx('flight-form', {'as-drawer': applyDrawerStyles})} name="flight-form" layout='vertical'
              form={form} initialValues={initialValues}
              autoComplete="off" preserve={false} onValuesChange={onValuesChange} requiredMark='optional'>
            <div className='flight-form-content'>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label='Depart Airport Code' name={FlightFormTypes.DepartAirport}
                                   rules={[{required: true, message: 'This field is required.'}]}>
                            <Input size='large' placeholder='e.g. ATL'/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Depart Airport' name={FlightFormTypes.DepartAt}
                                   rules={[{required: true, message: 'This field is required.'}]}>
                            <DatePicker showTime={{format:'HH:mm'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label='Arrive Airport Code' name={FlightFormTypes.ArriveAirport}
                                   rules={[{required: true, message: 'This field is required.'}]}>
                            <Input size='large' placeholder='e.g. YYZ'/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='Arrive Airport' name={FlightFormTypes.ArriveAt}
                                   rules={[{required: true, message: 'This field is required.'}]}>
                            <DatePicker showTime={{format:'HH:mm'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='Seat' name={FlightFormTypes.Seats}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input size='large' placeholder='e.g. 14D'/>
                </Form.Item>
                <Form.Item label='Plane' name={FlightFormTypes.Plane}>
                    <Input size='large' placeholder='e.g. AC001'/>
                </Form.Item>
            </div>
            {renderButton()}
        </Form>
    );
}

export default FlightForm;
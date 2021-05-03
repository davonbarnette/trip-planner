import React, {ChangeEvent, useEffect, useState} from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {debounce} from 'lodash'
import {LoadingOutlined} from '@ant-design/icons';
import './styles.scss';

import {Col, Empty, Input, Row, Select, Spin} from "antd";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {LatLng} from "leaflet";
import {TCoordinates, TCustomizedFormControls} from "../../../stores/App/Types";

const provider = new OpenStreetMapProvider();
const {Option} = Select;

interface Props extends TCustomizedFormControls<TCoordinates>{
    className?:string,
    disableCustomAddress?:boolean,
}


function GeoSearchSelect(props:Props) {
    const {onChange, disableCustomAddress, className, value} = props;
    const [lat, setLat] = useState<number|undefined>(value?.lat);
    const [lng, setLng] = useState<number|undefined>(value?.lng);
    const [loadingResults, setLoadingResults] = useState(false);
    const [leafletResults, setLeafletResults] = useState([]);
    const [address, setAddress] = useState<string|undefined>(undefined);

    useEffect(()=> {
        if (value?.lat) setLat(value.lat);
        if (value?.lng) setLng(value.lng);

    }, [value, lat, lng]);

    const onSelectAddress = (value: any) => {
        const [lat, lng, address] = deserializeLocation(value);

        setLat(parseFloat(lat));
        setLng(parseFloat(lng));
        setAddress(address);

        if (onChange && lat && lng) onChange({ lat:parseFloat(lat), lng:parseFloat(lng), address })
    };
    const getResults = async (value:string) => {
        if (!loadingResults) {
            setLoadingResults(true);
            setLeafletResults([]);
        }
        let results = await provider.search({query: value});
        if (results) {
            setLeafletResults(results);
            setLoadingResults(false);
        }
    };

    let debouncedGetResults = debounce(getResults, 500);

    const onSearchAddressChange = (value:string) => {
        return debouncedGetResults(value);
    };

    const serializeLocation = (lat:string, lng:string, label:string) => {
        return `${lat}_${lng}_${label}`
    };
    const deserializeLocation = (location:string) => {
        return location.split('_')
    };

    function getLoading(){
        if (!loadingResults) return <Empty description={<span className='no-data-description'>No Results For This Address</span>}/>;
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return <Spin indicator={antIcon}/>
    }
    function getResultsOptions(){
        if (leafletResults && leafletResults.length !== 0) return leafletResults.map((d:any) =>
            <Option key={serializeLocation(d.y, d.x, d.label)} value={serializeLocation(d.y, d.x, d.label)}>{d.label}</Option>
        );
        else return null;
    }

    function getAddressSearch() {
        if (disableCustomAddress) return null;
        return (
            <Select className={className} filterOption={false} onSelect={onSelectAddress}
                    notFoundContent={getLoading()} placeholder='Search address' style={{width:'100%'}}
                    showSearch size='large' defaultValue={address} onSearch={onSearchAddressChange}
                    showArrow={false}>
                {getResultsOptions()}
            </Select>
        )
    }

    function currentCoords() {
        if (lat && lng && !isNaN(lat) && !isNaN(lng)) return new LatLng(lat, lng);
        else return undefined;
    }
    function getMarker(){
        let coords = currentCoords();
        if (coords) return <Marker position={coords}/>
    }
    const onFieldChange = async (accessor:'lat'|'lng', value:any) => {
        let changed: any = {};

        if (accessor === 'lat') {
            setLat(value);
            changed.lat = value;
        } else {
            setLng(value);
            changed.lng = value;
        }

        if (onChange) onChange({lat, lng, ...changed} as any);
    };

    return (
        <div className='geo-search-select'>
            {getAddressSearch()}
            {currentCoords() &&
            <MapContainer style={{height:200}} center={currentCoords()} zoom={16}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=ee023b5577454f06918b8bbf8017dc91"/>
                {getMarker()}
            </MapContainer>}
        </div>
    )
};

export default GeoSearchSelect;
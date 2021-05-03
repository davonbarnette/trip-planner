import React from 'react';

import './styles.scss'
import {IDestination} from "../../../api/DestinationAPI/DestinationTypes";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {LatLng} from "leaflet";

interface Props {
    destination: IDestination
}

function Destination(props: Props) {
    const {lat, lng} = props.destination;

    function getPosition() {
        if (lat && lng) {
            return new LatLng(lat, lng);
        } else {
            return undefined;
        }
    }

    let position = getPosition();

    return (
        <div className='destination'>
            <div className='destination-content'>
                <div className='destination-content-left'>
                    {position &&
                    <MapContainer style={{height: 400}} center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=ee023b5577454f06918b8bbf8017dc91"
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>}
                </div>
                <div className='destination-content-right'>
                    <div className='header'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destination;
import React, {useEffect, useState} from 'react';

import './styles.scss';
import {ITrip} from "../../../api/TripAPI/TripTypes";
import TripAPI from "../../../api/TripAPI/TripAPI";
import {CalendarOutlined, EnvironmentOutlined, TeamOutlined} from "@ant-design/icons";
import NumbersUtil from "../../../global/utils/number";
import moment from "moment";
import DestinationsList from "../DestinationsList/DestinationsList";
import FlightAPI from "../../../api/FlightAPI/FlightAPI";
import {IFlight, IFlightSubmitValuesRaw, serializeFlightFormValues} from "../../../api/FlightAPI/FlightTypes";
import FlightsList from "../FlightsList/FlightsList";
import AttendeesList from "../AttendeesList/AttendeesList";
import DestinationFormModalAsButton from "../DestinationForm/DestinationFormModalAsButton";
import FlightFormModalAsButton from "../FlightForm/FlightFormModalAsButton";
import AppStore from "../../../stores/App/AppStore";
import {
    IDestination,
    IDestinationSubmitFormRaw,
    serializeDestinationFormValues
} from "../../../api/DestinationAPI/DestinationTypes";
import DestinationAPI from "../../../api/DestinationAPI/DestinationAPI";


interface Props {
    tripId: number
}

function Trip(props: Props) {
    const {tripId} = props;
    const [trip, setTrip] = useState<ITrip>();
    const [flights, setFlights] = useState<IFlight[]>([]);
    const [destinations, setDestinations] = useState<IDestination[]>([])

    async function getTrip() {
        let trip = await TripAPI.getTrip(tripId);
        if (trip) setTrip(trip);
    }

    async function getFlights() {
        let flights = await FlightAPI.getFlightsByTrip(tripId);
        if (flights) setFlights(flights);
    }

    async function createFlight(values:IFlightSubmitValuesRaw){
        let flight = await FlightAPI.createFlight(serializeFlightFormValues(values, AppStore.user!.id, tripId));
        if (flight){
            setFlights([...flights, flight]);
        }
    }

    async function getDestinations(){
        let destinations = await DestinationAPI.getDestinationsByTrip(tripId);
        if (destinations) setDestinations(destinations);
    }

    async function createDestination(values:IDestinationSubmitFormRaw){
        let curValues:IDestinationSubmitFormRaw = {
            ...values,
            author:AppStore.user?.id,
            trip:tripId,
        }
        let destination = await DestinationAPI.createDestination(serializeDestinationFormValues(curValues));
        if (destination) {
            if (destination) setDestinations([...destinations, destination]);
        }
    }

    async function onLoad(){
        await getTrip();
        await getFlights();
        await getDestinations();
    }

    useEffect(() => {
        onLoad();
    }, [])

    if (!trip) return null;
    const {trip_image, start_date, end_date, users, description, title} = trip;

    // @ts-ignore
    // @ts-ignore
    return (
        <div className='trip-container'>
            <div className='trip-container-header'>
                <div className='trip-container-header-content'>
                    <div className='title'>
                        {title}
                    </div>
                </div>
            </div>
            <div className='trip-container-content'>
                <div className='details'>
                    <div className='stats'>
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
                    <div className='description'>
                        {description}
                    </div>
                    <div className='bottom'>
                        <div className='left'>
                            <div className='bottom-header'>
                                Destinations
                                <DestinationFormModalAsButton onSubmit={createDestination}/>
                            </div>
                            <DestinationsList destinations={destinations}/>
                        </div>
                        <div className='right'>
                            <div className='bottom-header'>
                                Your Flights
                                <FlightFormModalAsButton onSubmit={createFlight}/>
                            </div>
                            <FlightsList flights={flights}/>
                            <div className='bottom-header'>Attendees</div>
                            <AttendeesList users={trip.users}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trip;
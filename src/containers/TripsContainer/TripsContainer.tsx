import React, {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';

import './styles.scss';

import TripsList from "../../components/specific/TripsList/TripsList";
import {BrowserRoutes} from "../../stores/App/BrowserRouter";
import Trip from "../../components/specific/Trip/Trip";
import {ITrip, serializeTripFormValues} from "../../api/TripAPI/TripTypes";
import TripAPI from "../../api/TripAPI/TripAPI";
import TripFormModalAsButton from "../../components/specific/TripForm/TripFormModalAsButton";

function TripsContainer() {
    const [trips, setTrips] = useState<ITrip[]>([]);

    async function getTrips() {
        let trips = await TripAPI.getTrips();
        if (trips) setTrips(trips);
    }

    async function createTrip(values){
        let trip = await TripAPI.createTrip(serializeTripFormValues(values));
        if (trip) setTrips([...trips, trip]);
    }

    useEffect(() => {
        getTrips();
    }, [])

    function renderTrip({match}) {
        return <Trip tripId={match.params.tripId}/>;
    }

    function renderTripsList() {
        return (
            <div className='trips-container-content'>
                <div className='trips-container-content-header'>
                    <div className='title'>
                        Your Trips
                    </div>
                    <TripFormModalAsButton onSubmit={createTrip}/>
                </div>
                <TripsList trips={trips}/>
            </div>
        )
    }

    return (
        <div className='trips-container'>
            <Switch>
                <Route exact path={BrowserRoutes.trips} render={renderTripsList}/>
                <Route exact path={BrowserRoutes.tripsByIdParam} render={renderTrip}/>
            </Switch>
        </div>
    )

}

export default TripsContainer;
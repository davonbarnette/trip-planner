import axios from "axios";

import AppStore from "../../stores/App/AppStore";
import {IFlight} from "./FlightTypes";

export default class FlightAPI {
    static async getFlightsByTrip(tripId:number) {
        try {
            let res = await axios.get('/flights', {params: {trip:tripId, user:AppStore.user?.id}});
            if (res.data) return res.data as IFlight[];
        } catch (e) {

        }
    }
    static async createFlight(values:any) {
        try {
            let res = await axios.post('/flights', values);
            if (res.data) return res.data as IFlight;
        } catch (e) {

        }
    }

    static async getFlightGroups(tripId:number){
        try {
            let res = await axios.get('/flight-groups', {params: {trip:tripId}});
            if (res.data) return res.data as IFlight[];
        } catch (e) {

        }
    }
}
import axios from "axios";
import {IDestination, IDestinationValues} from "./DestinationTypes";

export default class DestinationAPI {

    static async createDestination(values:IDestinationValues) {
        try {
            let res = await axios.post('/destinations', values);
            if (res.data) return res.data as IDestination;
        } catch (e) {

        }
    }
    static async getDestinationsByTrip(tripId:number) {
        try {
            let res = await axios.get('/destinations', {params: {trip:tripId}});
            if (res.data) return res.data as IDestination[];
        } catch (e) {

        }
    }
}
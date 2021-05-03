import axios from "axios";
import {ITrip} from "./TripTypes";

export default class TripAPI {

    static async getTrips(params?:any){
        try{
            let res = await axios.get('/trips', {params});
            if (res.data) return res.data as ITrip[];
        } catch (e) {

        }
    }
    static async getTrip(tripId:number){
        try{
            let res = await axios.get(`/trips/${tripId}`);
            if (res.data) return res.data as ITrip;
        } catch (e) {

        }
    }

    static async createTrip(values:any){
        try{
            let res = await axios.post(`/trips`, values);
            if (res.data) return res.data as ITrip;
        } catch (e) {

        }
    }
}
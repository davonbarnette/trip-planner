import {ITripSubmitValuesRaw, ITripValues} from "../TripAPI/TripTypes";
import moment from "moment";

export interface IFlight {
    depart_at:string,
    arrive_at:string,
    seats:string,
    plane:string,
    depart_airport:string,
    arrive_airport:string,
    trip:any,
    user:any,
}

export interface IFlightSubmitValuesRaw {
    depart_at:moment.Moment,
    arrive_at:moment.Moment,
    seats:string,
    plane:string,
    depart_airport:string,
    arrive_airport:string,
}

export function serializeFlightFormValues(values:IFlightSubmitValuesRaw, userId:number, tripId:number){
    let ret:IFlight = {
        depart_at: values.depart_at.toISOString(),
        arrive_at: values.depart_at.toISOString(),
        seats: values.seats,
        plane:values.plane,
        depart_airport: values.depart_airport,
        arrive_airport: values.arrive_airport,
        trip:tripId,
        user:userId,
    };

    return ret;

}
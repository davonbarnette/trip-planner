import {IDestination} from "../DestinationAPI/DestinationTypes";
import {IItinerary} from "../ItineraryAPI/ItineraryTypes";

export interface IUser {
    username:string,
    email:string,
    destinations:IDestination[],
    itineraries:IItinerary[],
    first_name:string,
    last_name:string,
}
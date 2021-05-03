import {IDestination} from "../DestinationAPI/DestinationTypes";

export interface ILink {
    title:string,
    url:string,
    destination:IDestination,
}
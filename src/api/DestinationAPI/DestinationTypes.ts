import {ILink} from "../LinkAPI/LinkTypes";
import {IUser} from "../UserAPI/UserTypes";
import {IImage} from "../../stores/App/Types";
import {ITrip} from "../TripAPI/TripTypes";

export interface IDestination {
    name: string,
    destination_images: IImage[],
    description: string,
    destination_links: ILink[],
    author: IUser,
    trip:ITrip
    lat:number,
    lng:number,
    address:string,
}

export interface IDestinationSubmitFormRaw {
    name: string,
    description?: string,
    address: {
        lat: number,
        lng: number,
        address: string,
    },
    author?:number,
    trip:number
}

export interface IDestinationValues {
    name: string,
    description?: string,
    lat: number,
    lng: number,
    address: string,
    author?:number,
    trip:number,
}


export function serializeDestinationFormValues(values: IDestinationSubmitFormRaw) {
    let ret: IDestinationValues = {
        name: values.name,
        description:values.description,
        lat:values.address.lat,
        lng: values.address.lng,
        address: values.address.address,
        author: values.author,
        trip:values.trip,
    };
    return ret;
}
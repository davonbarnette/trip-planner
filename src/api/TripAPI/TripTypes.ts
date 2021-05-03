import {IDestination} from "../DestinationAPI/DestinationTypes";
import {IImage} from "../../stores/App/Types";
import {IUser} from "../UserAPI/UserTypes";
import moment from "moment";

export interface ITrip {
    start_date:string,
    end_date:string,
    destinations:IDestination[],
    title:string,
    description:string,
    trip_image:IImage,
    users:IUser[],
}

export interface ITripSubmitValuesRaw {
    description:string,
    title:string,
    end_date:moment.Moment,
    start_date:moment.Moment,
    trip_image?:any
}

export interface ITripValues {
    description:string,
    title:string,
    end_date:string,
    start_date:string,
    trip_image?:any
}

export function serializeTripFormValues(values:ITripSubmitValuesRaw){
    let ret:ITripValues = {
        description: values.description,
        title: values.title,
        end_date: values.end_date.toISOString(),
        start_date: values.start_date.toISOString(),
    };

    let formData = new FormData();
    formData.append('data', JSON.stringify(ret));

    if (values.trip_image && values.trip_image[0]){
        let file = values.trip_image[0].originFileObj;
        formData.append('files.trip_image', file, file.name);
    }

    return formData;

}
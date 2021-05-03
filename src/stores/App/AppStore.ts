import {decorate, observable, computed} from "mobx";
import {TUser} from "./Types";
import axios from "axios";
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.davon.dev';

class AppStoreClass {

    initialized:    boolean = false;
    user?:          TUser;
    authToken?:     string;
    authTokenChecked:boolean = false;
    baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://api.davon.dev';

    currentCoordinates = [];
    
    init(){

    }

    getStrapiImageURL(imagePath:string){
        return `${this.baseUrl}${imagePath}`;
    }


    get necessaryDataIsLoaded(){
        return true;
    }
}


decorate(AppStoreClass, {
    authToken:      observable,
    authTokenChecked:observable,
    user:           observable,
    necessaryDataIsLoaded: computed,
    currentCoordinates:observable,
});


const AppStore = new AppStoreClass();
export default AppStore;
import axios from 'axios';
import { environment } from "../components/baseUrl";


export class Service {
    endpointUrl = environment.baseUrl;

    getFlagranciaRegistrado() {
        return axios.get(this.endpointUrl+ "flagrancia/registrado/").then(res => res.data);
    }
    
    getFlagranciaIngresado() {
        return axios.get(this.endpointUrl+ "flagrancia/ingresado/").then(res => res.data);
    }
}

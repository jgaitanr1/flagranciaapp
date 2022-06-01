const localhostEndpoint = "https://localhost:44355/api/";
const productionEndpoint = "https://rossatyapi.azurewebsites.net/api/";
const defaultEndpoint = localhostEndpoint;

const restrictions = {
    MIN_DATE_TO_MAKE_ORDER: new Date()
}

export const environment = {
    baseUrl: defaultEndpoint,
    businessRules: restrictions
}

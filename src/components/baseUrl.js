const localhostEndpoint = "https://localhost:44355/api/";
const productionEndpoint = "https://cortelimasurapi.azurewebsites.net/api/";
//se cambia la base URL
const defaultEndpoint = productionEndpoint;

const restrictions = {
    MIN_DATE_TO_MAKE_ORDER: new Date()
}

export const environment = {
    baseUrl: defaultEndpoint,
    businessRules: restrictions
}

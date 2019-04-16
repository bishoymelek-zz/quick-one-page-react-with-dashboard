/*
 All routes associated to the project
*/

// End-User Site Routes
import endUserSite from './endUserSite/routes/routesList'

let routeConfig = [];
// concat all routes
routeConfig = routeConfig.concat(
    endUserSite(),
);

export default routeConfig;

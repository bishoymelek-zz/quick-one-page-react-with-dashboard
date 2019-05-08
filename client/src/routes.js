/*
 All routes associated to the project
*/

// Super Admin Site Routes
import superAdmin from './superAdmin/routes/routesList'

let routeConfig = [];
// concat all routes
routeConfig = routeConfig.concat(
    superAdmin(),
);

export default routeConfig;

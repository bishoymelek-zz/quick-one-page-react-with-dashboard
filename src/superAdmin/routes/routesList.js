import homePage from './home'
import authPage from './auth'


const routesList = [
    { path: '', component: authPage },
    { path: 'home', component: homePage },
];
export default routesList;

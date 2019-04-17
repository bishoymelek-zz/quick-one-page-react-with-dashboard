import homePage from './home'
import authPage from './auth'
export default (store) => { 
    return [
        { path: '/', component: authPage },
        { path: '/home', component: homePage },
    ]
}

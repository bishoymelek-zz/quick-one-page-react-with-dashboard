import homePage from './home'
import authPage from './auth'
export default (store) => { 
    return [
        { path: '/', component: authPage,public:true },
        { path: '/home', component: homePage,public:false },
    ]
}

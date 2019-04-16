import homePage from './home'
export default (store) => { 
    return [
        { path: '/home', component: homePage },
        { path: '/', component: homePage },
    ]
}

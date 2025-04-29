import { lazy } from 'react';


const routers = [
    {
        path: '/',
        component: lazy(() => import('@components/HomePage/HomePage'))
    },
    {
        path: '/document',
        component: lazy(() => import('@pages/Document/Document'))
    },
    {
        path: '/search',
        component: lazy(() => import('@pages/Search/Search'))   
    },
    {
        path: '/signup',
        component: lazy(() => import('@pages/Profile/Profile'))
    }

];

export default routers;

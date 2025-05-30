import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@components/HomePage/HomePage')),
    },
    {
        path: '/document',
        component: lazy(() => import('@pages/Document/Document')),
    },
    {
        path: '/fullviewdocument',
        component: lazy(() => import('@pages/FullViewDocument/FullViewDocument')),
    },
    {
        path: '/search',
        component: lazy(() => import('@pages/Search/Search')),
    },
    {
        path: '/login',
        component: lazy(() => import('@pages/LoginAndSignUp/Login')),
    },
    {
        path: '/profile',
        component: lazy(() => import('@pages/Profile/Profile')),
    },
    {
        path: '/profile/:id',
        component: lazy(() => import('@pages/Profile/Profile')),
    },
    {
        path: '/reviewdocument',
        component: lazy(() => import('@pages/ReviewDocument/ReviewDocument')),
    },
    {
        path: '/reviewdocument/:id',
        component: lazy(() => import('@pages/ReviewDocument/ReviewDocument')),
    },
    {
        path: '/upfile',
        component: lazy(() => import('@pages/UpFile/UpFile')),
    },
];

export default routers;

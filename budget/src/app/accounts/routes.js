import * as components from './components';
export default [{
        path: '/',
        component: components.AccountsListView,
        name: 'accountsListView'
    },
    {
        path: '/accounts/create',
        component: components.CreateEditAccount,
        name: 'createEditAccount'
    }, {
        path: '/accounts/:accountId/edit', // the URL accepts an accountId parameter
        component: components.CreateEditAccount,
        name: 'editAccount'
    }
];
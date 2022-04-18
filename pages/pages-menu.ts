import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    // {
    //     title: 'Dashboard',
    //     icon: 'ion-home',
    //     link: '/pages/dashboard',
    //     home: true,
    // },
    // {
    //     title: 'User Role',
    //     icon: 'nb-layout-two-column',
    //     children: [
    //         {
    //             title: 'Create',
    //             link: '/pages/roles/create',
    //         },
    //         {
    //             title: 'List',
    //             link: '/pages/roles/list',
    //         },
    //     ],
    // },
    /*
    {
        title: 'Assign',
        icon: 'nb-layout-two-column',
        link: '/pages/assigning/'
    },
    */
   {
        title: 'User Management',
        icon: 'nb-home',
        
        children: [
            {
                title: 'Create',
                link: '/pages/user/create',
            },
            {
                title: 'List',
                link: '/pages/user/list',
            },

            {
                title: 'Create',
                link: '/pages/roles/create',
            },
            {
                title: 'List',
                link: '/pages/roles/list',
            },
            {
                title: 'Menu Create',
                link: '/pages/menus/create',
                //hidden: true,
            },
            {
                title: 'Menu List',
                link: '/pages/menus/list',
            },
            {
                title: 'Menu Manage',
                link: '/pages/menus/manage',
            },
        ],
    }, 

    {
        title: 'Setup',
        icon: 'nb-gear',
        children: [
            // {
            //     title: 'Create',
            //     link: '/pages/users/create',
            // },
            // {
            //     title: 'List',
            //     link: '/pages/users/list',
            // },
            {
                title: 'Project Inventory',
                link: '/pages/user/assign',
            },

            {
                title: 'Price Setup',
                link: '/pages/user/priceSet',
            },

            {
                title: 'Land Owner',
                link: '/pages/land-owner/list',
            },

            {
                title: 'Contact',
                link: '/pages/contact/list',
            },
            {
                title: 'Project',
                link: '/pages/project/list',
            },
            {
                title: 'Offer',
                link: '/pages/offer/list',
            },

            // {
            //     title: 'Report',
            //     link: '/pages/users/report',
            // },
        ],
    },

    {
        title: 'Sales ',
        icon: 'nb-bar-chart',
        children: [
            {
                title: 'Invoice',
                link: '/pages/sales/list'
            },
        ],
    },
    {
        title: 'Task Management',
        icon: 'nb-grid-b-outline',
        children: [
            {
                title: 'Task',
                link: '/pages/taskinfo/list'
            },
            {
                title: 'Event',
                link: '/pages/eventinfo/list'
            },
            {
                title: 'Call',
                link: '/pages/callinfo/list'
            },
        ],
    },

    {
        title: 'Reports',
        icon: 'nb-compose',
        children: [
            {
                title: 'Contact',
                link: '/pages/reports/contact',
            },{
                title: 'Project',
                link: '/pages/reports/project',
            },{
                title: 'Offer Send',
                link: '/pages/reports/offer',
            },{
                title: 'Sales',
                link: '/pages/reports/sales',
            },{
                title: 'Sales Performance',
                link: '/pages/reports/sale-performance',
            },

        ],
    },
    // {
    //     title: 'Module',
    //     icon: 'nb-grid-a',
    //     hidden: true,
    //     children: [
    //         {
    //             title: 'Create',
    //             link: '/pages/module/create',
    //         },
    //         {
    //             title: 'List',
    //             link: '/pages/module/list',
    //         },
    //     ],
    // },
    // {
    //     title: 'Menu',
    //     icon: 'nb-menu',
    //     children: [
    //         {
    //             title: 'Create',
    //             link: '/pages/menus/create',
    //             hidden: true,
    //         },
    //         {
    //             title: 'List',
    //             link: '/pages/menus/list',
    //         },
    //         {
    //             title: 'Manage',
    //             link: '/pages/menus/manage',
    //         },
    //     ],
    // },
];

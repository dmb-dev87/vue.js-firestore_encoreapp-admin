export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavTitle',
                _children: ['Admin Venue']
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Dashboard',
                to: '/dashboard',
                icon: 'cil-speedometer',
            },
            {
                _name: 'CSidebarNavItem',
                name: 'List Your Business',
                to: '/business',
                icon: 'cil-layers'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Business Details',
                to: '/chrisvenues',
                icon: 'cil-layers'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Sliders',
                to: '/sliders',
                icon: 'cil-layers'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Category',
                to: '/categories',
                icon: 'cil-layers'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Users',
                to: '/users',
                icon: 'cil-people',
            },
        ]
    }
]
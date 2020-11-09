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
                icon: 'cil-bank'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Business Details',
                to: '/chrisvenues',
                icon: 'cil-dinner'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Membership Plan',
                to: '/membership',
                icon: 'cil-list'
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
                icon: 'cil-storage'
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
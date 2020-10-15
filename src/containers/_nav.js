export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['Venue name here']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Get Started Guild',
        to: '/#',
        icon: 'cil-map'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Chrisvenues',
        to: '/chrisvenue',
        icon: 'cil-library-building'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Business Details',
        to: '/details',
        icon: 'cil-institution'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Gallery',
        to: '/#',
        icon: 'cil-image'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Category',
        to: '/categories',
        icon: 'cil-layers'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Settings',
        to: '/settings',
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
        icon: 'cil-people',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Log out',
        to: '/#',
        icon: 'cil-account-logout'
      },
    ]
  }
]
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
        name: 'Business Details',
        to: '/chrisvenues',
        icon: 'cil-library-building'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Sliders',
        to: '/sliders',
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
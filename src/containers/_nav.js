export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
          _name: 'CSidebarNavTitle',
          _children: ['Venue Owner']
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
    ]
  }
]
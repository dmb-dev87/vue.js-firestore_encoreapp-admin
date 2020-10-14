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
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Get Started Guild',
        to: '/#',
        icon: 'cil-map'
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
        name: 'Statistics and reports',
        to: '/#',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reviews',
        to: '/#',
        icon: 'cid-star-half'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Settings',
        to: '/settings',
        icon: 'cil-settings'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Promotions',
        to: '/#',
        icon: 'cib-probot'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Select plan',
        to: '/#',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Billing',
        to: '/#',
        icon: 'cil-dollar'
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
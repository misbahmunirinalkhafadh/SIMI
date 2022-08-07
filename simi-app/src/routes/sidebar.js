/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    icon: 'PagesIcon',
    name: 'Components',
    routes: [
      // submenu
      {
        path: '/app/forms',
        name: 'Forms',
      },
      {
        path: '/app/cards',
        name: 'Cards',
      },
      {
        path: '/app/charts',
        name: 'Charts',
      },
      {
        path: '/app/buttons',
        name: 'Buttons',
      },
      {
        path: '/app/modals',
        name: 'Modals',
      },
      {
        path: '/app/tables',
        name: 'Tables',
      },
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Sample Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },
]

export default routes

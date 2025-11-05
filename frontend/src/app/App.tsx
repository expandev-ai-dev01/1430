import { Outlet } from 'react-router-dom';

/**
 * @component App
 * @summary Root application component that renders the router outlet
 * @domain core
 * @type root-component
 * @category application
 */
export const App = () => {
  return <Outlet />;
};

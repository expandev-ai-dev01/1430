import { Outlet } from 'react-router-dom';
import { Header } from './_impl/Header';
import { Footer } from './_impl/Footer';

/**
 * @component PublicLayout
 * @summary Main layout for public pages with header and footer
 * @domain core
 * @type layout-component
 * @category layout
 */
export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

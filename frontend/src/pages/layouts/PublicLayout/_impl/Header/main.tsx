import { Link } from 'react-router-dom';

/**
 * @component Header
 * @summary Public site header with navigation
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Prefeitura da Cidade
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Início
            </Link>
            <Link to="/sobre" className="hover:text-blue-200 transition-colors">
              Sobre
            </Link>
            <Link to="/servicos" className="hover:text-blue-200 transition-colors">
              Serviços
            </Link>
            <Link to="/noticias" className="hover:text-blue-200 transition-colors">
              Notícias
            </Link>
            <Link to="/contato" className="hover:text-blue-200 transition-colors">
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

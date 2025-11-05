import { useNavigate } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary 404 error page for non-existent routes
 * @domain core
 * @type error-page
 * @category error
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

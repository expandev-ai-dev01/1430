/**
 * @page HomePage
 * @summary Main landing page displaying city highlights and quick access
 * @domain public
 * @type landing-page
 * @category public
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 * - Guards: none
 */
export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo à Prefeitura da Cidade</h1>
        <p className="text-xl text-gray-600">
          Portal oficial de informações, serviços e transparência para o cidadão.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Serviços ao Cidadão</h2>
          <p className="text-gray-600 mb-4">
            Acesse serviços públicos, emita documentos e faça solicitações online.
          </p>
          <a href="/servicos" className="text-blue-600 hover:text-blue-700 font-medium">
            Acessar Serviços →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Notícias</h2>
          <p className="text-gray-600 mb-4">
            Fique por dentro das últimas notícias e comunicados oficiais.
          </p>
          <a href="/noticias" className="text-blue-600 hover:text-blue-700 font-medium">
            Ver Notícias →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Transparência</h2>
          <p className="text-gray-600 mb-4">
            Consulte informações sobre orçamento, licitações e prestação de contas.
          </p>
          <a href="/transparencia" className="text-blue-600 hover:text-blue-700 font-medium">
            Acessar Portal →
          </a>
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Agenda de Eventos</h2>
        <p className="text-gray-600 mb-4">
          Confira os próximos eventos culturais, cívicos e esportivos da cidade.
        </p>
        <a
          href="/eventos"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Ver Agenda Completa
        </a>
      </section>
    </div>
  );
};

export default HomePage;

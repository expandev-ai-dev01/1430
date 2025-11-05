/**
 * @component Footer
 * @summary Public site footer with information and links
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Prefeitura da Cidade</h3>
            <p className="text-gray-400 text-sm">
              Trabalhando para melhorar a qualidade de vida dos cidadãos.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/transparencia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Transparência
                </a>
              </li>
              <li>
                <a href="/ouvidoria" className="text-gray-400 hover:text-white transition-colors">
                  Ouvidoria
                </a>
              </li>
              <li>
                <a href="/legislacao" className="text-gray-400 hover:text-white transition-colors">
                  Legislação
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Telefone: (00) 0000-0000</li>
              <li>Email: contato@prefeitura.gov.br</li>
              <li>Endereço: Rua Principal, 123</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Prefeitura da Cidade. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

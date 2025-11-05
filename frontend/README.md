# Prefeitura da Cidade - Frontend

Site oficial da Prefeitura da Cidade para divulgação de informações, serviços e transparência.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Tailwind CSS 3.4.14
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── router.tsx         # Configuração de rotas
│   └── providers.tsx      # Providers globais
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Types globais
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio (a serem criados)
└── assets/               # Assets estáticos
    └── styles/           # Estilos globais
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente:
```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Funcionalidades Planejadas

- [x] Estrutura base do projeto
- [x] Configuração de rotas
- [x] Layout público
- [x] Página inicial
- [ ] Página de notícias
- [ ] Página de serviços
- [ ] Portal de transparência
- [ ] Agenda de eventos
- [ ] Galeria de mídia
- [ ] Legislação municipal
- [ ] Secretarias e órgãos
- [ ] Contato e ouvidoria
- [ ] Informações municipais

## Padrões de Código

- Use TypeScript para todos os arquivos
- Siga a estrutura de pastas definida
- Componentes devem ter JSDoc documentation
- Use Tailwind CSS para estilização
- Prefira composição sobre herança
- Mantenha componentes pequenos e focados

## Contribuição

Este é um projeto interno. Para contribuir, siga os padrões estabelecidos na documentação de arquitetura.
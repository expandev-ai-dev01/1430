# Prefeitura da Cidade - Backend API

Backend API for the municipal website of Prefeitura da Cidade.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- In-memory data storage (no database)
- CORS enabled for frontend integration
- Security headers with Helmet
- Request compression
- Environment-based configuration

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

Server will start on http://localhost:3000

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Testing

```bash
npm test
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
└── server.ts               # Application entry point
```

## License

ISC

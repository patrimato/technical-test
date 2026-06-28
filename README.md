# MobileStore - Frontend Technical Test

A single-page application for browsing and purchasing mobile devices. Users can explore
a product catalog, filter by brand or model in real time, view product details and
add items to their cart.

## Requirements

- Node.js v20
- npm v10

## Installation

```bash
npm install
```

## Scripts

```bash
npm run start    # Development mode
npm run build    # Production build
npm run test     # Run tests
npm run lint     # Check code
```

## Tech stack

- React 19
- React Router 7
- Vite
- Vitest + React Testing Library
- ESLint

## API

This app consumes the API available at:
`https://itx-frontend-test.onrender.com`

## Project structure

```text
src/
├── api/            # API calls and cache
├── components/     # Reusable components
├── context/        # React Context (cart)
├── pages/          # Application views (PLP, PDP)
├── test/           # Unit and integration tests
└── utils/          # Helper functions
```

## Author

Patricia Mato Miragaya - patriciamato10@gmail.com
# LTL TMS Frontend

Next.js 14 frontend dashboard for LTL Transportation Management System.

## Features

- ✅ Quote generation form
- ✅ Real-time quote listing
- ✅ Dashboard with analytics
- ✅ Responsive design (mobile-friendly)
- ✅ Type-safe with TypeScript
- ✅ State management with Zustand
- ✅ API integration with Axios
- ✅ Data fetching with React Query
- ✅ Charts with Recharts

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn or npm

### Installation

```bash
cd packages/frontend
yarn install
```

### Environment Setup

```bash
cp .env.example .env
```

Update the API URL if your backend runs on a different port:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Development

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

```bash
yarn build
yarn start
```

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── dashboard/      # Dashboard page
│   ├── quotes/         # Quotes page
│   ├── orders/         # Orders page (coming soon)
│   ├── shipments/      # Shipments page (coming soon)
│   ├── invoices/       # Invoices page (coming soon)
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation bar
│   ├── QuoteForm.tsx   # Quote form component
│   └── QuotesList.tsx  # Quotes list component
├── lib/                 # Utilities and configurations
│   └── api.ts          # API client
├── store/              # Zustand store
│   └── quoteStore.ts   # Quote state management
└── types/              # TypeScript types
    └── index.ts        # Type definitions
```

## Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Heroicons

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`.

### Available Endpoints

- `POST /quotes` - Create a new quote
- `GET /quotes` - List all quotes
- `GET /quotes/:id` - Get a specific quote
- `GET /quotes/carrier/:carrier` - Get quotes by carrier
- `GET /quotes/best/:originZip/:destinationZip` - Get best quote
- `DELETE /quotes/:id` - Delete (expire) a quote

## Next Steps

- [ ] Add Orders feature
- [ ] Add Shipment tracking
- [ ] Add Invoice management
- [ ] Add User authentication
- [ ] Add Admin dashboard
- [ ] Add Export to CSV/PDF

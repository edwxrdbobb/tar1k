# TAR1K - Official Website

Official website of TAR1K - Musical artist exploring sound, rhythm, and storytelling through innovative musical expression.

## Technologies

This project is built with:

- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Three Fiber** - 3D graphics library
- **GSAP** - Animation library

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── components/     # React components
  ├── pages/         # Page components
  ├── hooks/         # Custom React hooks
  └── lib/           # Utility functions
```

## Development

The project uses Vite for fast development with HMR (Hot Module Replacement). Changes to files will automatically refresh in the browser.

## Building for Production

```sh
npm run build
```

The production build will be output to the `dist` directory.

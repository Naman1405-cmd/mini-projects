# replit.md

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) that appears to be a code editor platform. The application uses a modern tech stack including TypeScript, Vite for build tooling, and shadcn/ui for the component library. The main feature is a code editor component that allows users to edit HTML, CSS, and JavaScript code with features like theme switching, code formatting, and file operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming, supporting both light and dark modes
- **Code Structure**: Component-based architecture with shared utilities and hooks

### Backend Architecture  
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Development Setup**: Hot module replacement with Vite integration for development
- **Error Handling**: Centralized error handling middleware with consistent JSON error responses
- **Logging**: Custom request logging for API endpoints with response time tracking

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL driver
- **Development Storage**: In-memory storage implementation for development/testing
- **Session Management**: PostgreSQL session store (connect-pg-simple) for user sessions

### Authentication and Authorization
- **User Schema**: Basic user model with username/password authentication
- **Validation**: Zod schema validation integrated with Drizzle for type-safe database operations
- **Session Handling**: Express sessions with PostgreSQL backing store

### Build and Deployment
- **Production Build**: Vite builds the frontend to `dist/public`, Express server bundled with esbuild
- **Development**: Concurrent frontend (Vite dev server) and backend (tsx with hot reload)
- **Asset Management**: Static file serving in production with proper caching headers

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Drizzle Kit**: Database migration and introspection tools

### UI and Styling
- **shadcn/ui**: Component library built on Radix UI and Tailwind CSS
- **Radix UI**: Low-level UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs

### Development and Build Tools
- **Vite**: Frontend build tool with hot module replacement and optimized bundling
- **TypeScript**: Static type checking for both frontend and backend
- **esbuild**: Fast JavaScript bundler for production server builds
- **Replit Plugins**: Development experience enhancements (error overlay, cartographer, dev banner)

### Form and Data Management
- **React Hook Form**: Form state management with validation
- **TanStack Query**: Server state management, caching, and synchronization
- **Zod**: Runtime type validation and parsing
- **date-fns**: Date manipulation utility library
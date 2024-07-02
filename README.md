# Playlist-api

Demo REST backend using Express.js,mongodb, Swagger for API documentation, and Supertest for testing.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

1. Clone the repository:

   ```bash
   git clone https://github.com/lafetz/playlist-api
   cd playlist-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Create a `.env` file in the root of the project and add the following variables:
   ```bash
   MONGODB_URI=*
   PORT=*
   JWT_KEY=*
   ```

### Running the Project

To start the server:

```bash
npm run start
```

### API Documentation

Swagger documentation is available at http://localhost:{port}/docs.

### Testing

add test db

```bash
   TEST_MONGODB_URI=*
```

run

```bash
   npm run test
```

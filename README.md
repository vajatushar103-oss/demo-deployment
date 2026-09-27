# PRIME Machines — React + Tailwind + Node + Express + MongoDB

This is the React migration of the original PRIME Machines HTML/JavaScript website.

## Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- React Router
- Lucide React icons

## Structure

```text
prime-machines/
├── client/
│   ├── public/images/          # Put existing client/logo images here
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── contact/
│       │   ├── home/
│       │   ├── layout/
│       │   └── products/
│       ├── data/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── styles/
├── server/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── data/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
└── package.json
```

## 1. Install

From the project root:

```bash
npm run install:all
```

If `npm install` gives an npm error, run the client and server installs separately:

```bash
npm install
cd client
npm install
cd ../server
npm install
```

## 2. Configure MongoDB

Copy:

```text
server/.env.example -> server/.env
```

Set your MongoDB connection string.

Example local MongoDB:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/prime_machines
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

## 3. Seed products

The original `script.js` contained 9 product records. They have been moved into the server seed data.

```bash
npm run seed
```

This creates/updates the products in MongoDB.

## 4. Run

From the root:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

API:

```text
http://localhost:5000/api
```

## API

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Enquiries

```text
POST /api/enquiries
GET  /api/enquiries
```

The contact form now sends the enquiry to Express instead of only displaying the old demo message.

## Existing client images

The old HTML referenced:

```text
baja_auto.jpeg
tvs.png
eicher.jpeg
force.jpeg
godrej.jpeg
kinetic.jpeg
```

Put those files in:

```text
client/public/images/
```

The product images are still the image URLs from the original project.

## Important

The original page says some company statistics/customer information are based on the current company website. Those values have been preserved as website content; verify them before using the site publicly.

## Production

For production, set:

```env
NODE_ENV=production
CLIENT_URL=https://your-domain.com
MONGODB_URI=...
```

Build the React application:

```bash
npm run build
```

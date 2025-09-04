# URL Shortener System Design

This project is a backend implementation of a URL Shortener system built with Node.js, Express, and MongoDB. It includes utilities for generating short codes, validating URLs, and comprehensive API endpoints for URL management.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Components](#components)
7. [Usage Examples](#usage-examples)
8. [Testing](#testing)
9. [Project Structure](#project-structure)
10. [License](#license)

---

## Features

- ✅ URL shortening with custom expiration dates
- ✅ URL validation and sanitization
- ✅ Click tracking and analytics
- ✅ MongoDB for persistent storage
- ✅ Top URLs ranking system
- ✅ Automatic cleanup of expired URLs
- ✅ RESTful API design
- ✅ Collision detection for unique short codes

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Validation**: Custom URL validator
- **Dev Tools**: Nodemon

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "URL SHORTNER(SYSTEM DESIGN)"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Run the application:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/urlshortner
```

---

## API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/shorten` | Shorten a new URL |
| `GET` | `/url/:shortCode` | Get URL details by short code |
| `GET` | `/redirect/:shortCode` | Redirect to original URL |
| `GET` | `/stats/:shortCode` | Get URL statistics |
| `GET` | `/top` | Get top 10 most visited URLs |
| `DELETE` | `/cleanup` | Clean up expired URLs |

### API Examples

#### Shorten URL
```http
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com",
  "expirationDays": 30
}
```

#### Get URL Stats
```http
GET /stats/abc123
```

#### Redirect to Original URL
```http
GET /redirect/abc123
```

---

## Components

### ShortCodeGenerator

Generates random alphanumeric short codes for URLs.

**File**: `components/ShortCodeGenerator.js`

```javascript
const generate = require("./components/ShortCodeGenerator");
const shortCode = generate(); // Returns: "aB3dE7F"
```

**Features**:
- 7-character length
- Uses alphanumeric characters (A-Z, a-z, 0-9)
- Collision detection and retry mechanism

### URLValidator

Validates URL format and protocol requirements.

**File**: `components/URLValidator.js`

```javascript
const URLValidator = require("./components/URLValidator");

const result = URLValidator.validate("https://example.com");
// Returns: { valid: true, message: "Valid URL" }
```

**Validation Rules**:
- Must be a string
- Must start with `http://` or `https://`
- Must be a valid URL format

---

## Usage Examples

### Basic URL Shortening

```javascript
// POST /shorten
{
  "url": "https://www.google.com",
  "expirationDays": 7
}

// Response
{
  "success": true,
  "data": {
    "originalUrl": "https://www.google.com",
    "shortUrl": "http://localhost:3000/aB3dE7F",
    "shortCode": "aB3dE7F",
    "expireAt": "2024-09-11T10:30:00.000Z"
  }
}
```

### Getting URL Statistics

```javascript
// GET /stats/aB3dE7F
{
  "success": true,
  "data": {
    "shortCode": "aB3dE7F",
    "originalUrl": "https://www.google.com",
    "createdAt": "2024-09-04T10:30:00.000Z",
    "clicks": 15,
    "expireAt": "2024-09-11T10:30:00.000Z"
  }
}
```

---

## Testing

### Using Postman

1. **Import the collection** with these endpoints:
   - `POST http://localhost:3000/shorten`
   - `GET http://localhost:3000/redirect/:shortCode`
   - `GET http://localhost:3000/stats/:shortCode`
   - `GET http://localhost:3000/top`
   - `DELETE http://localhost:3000/cleanup`

2. **Test the flow**:
   - Create a short URL
   - Use the returned short code to test redirect
   - Check stats to see click count

### Running Tests

```bash
npm test
```

---

## Project Structure

```
URL SHORTNER(SYSTEM DESIGN)/
├── components/
│   ├── ShortCodeGenerator.js
│   └── URLValidator.js
├── controllers/
│   └── UrlController.js
├── models/
│   └── urlModel.js
├── routes/
│   └── urlRoutes.js
├── services/
│   └── urlServices.js
├── server.js
├── package.json
└── README.md
```

---

## Use Cases

- **URL Shortening Services**: Create compact URLs for sharing
- **Link Tracking**: Monitor click analytics and user engagement
- **Marketing Campaigns**: Track campaign performance through shortened links
- **Social Media**: Share links efficiently with character limits
- **QR Code Generation**: Create scannable codes for physical media

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Author

**Shubham**  
Backend Developer specializing in system design and scalable applications.
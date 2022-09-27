# RESTful API Template
Node.js RESTful API Template with JWT Authentication using MongoDB

## Setup & Installation
### 1. Install all modules
```
npm install
```
### 2. Setup environment variables
Create a `.env` file in your main directory and import as such below.
```
DB_CONNECTION=YOUR_MONGODB_URI_GOES_HERE
PORT=8000
ACCESS_TOKEN=YOUR_ACCESS_TOKEN_SECRET_GOES_HERE
REFRESH_TOKEN=YOUR_REFRESH_TOKEN_SECRET_GOES_HERE
```

### 3. Generating tokens within Node (Optional)
You can generate your ACCESS_TOKEN and REFRESH_TOKEN directly in node using the crypto library. You can run the second line twice to obtain both tokens.
```
node
require('crypto').randomBytes(64).toString('hex')
```


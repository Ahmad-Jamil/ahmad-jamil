# my-portfolio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run backend locally (messages in MongoDB)
```
npm run backend
```
Requires a `.env` file with `MONGODB_URI=your_mongodb_connection_string`.

### Deploy to Vercel (messages in MongoDB)
- **Environment variable:** In Vercel → Project → Settings → Environment Variables, add:
  - `MONGODB_URI` = your MongoDB Atlas (or other) connection string
- The `api/` folder is used as serverless functions: `api/messages.js` and `api/auth.js` handle `/api/messages` and `/api/auth`.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

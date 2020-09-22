module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/kitchen_hero',
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 
      "http://localhost:3000/api"
  }